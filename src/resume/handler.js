const { users } = require('../../models'); 

const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');

const pdf = require('pdf-parse');
const axios = require('axios');

const { Storage } = require("@google-cloud/storage");
const key = require("../../bucket.json");
const { log } = require('console');
const client = new Storage({
    projectId: 'ninth-arena-403511',
    credentials: key,
  });
const bucketName = "demo-jobsterific";
const bucket = client.bucket(bucketName);

const { predictHandler } = require('../ml/handler');


const decryptData = (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
const uploadResume = async (request, h) => {
    const token = request.headers['token'];
    const key = 'Jobsterific102723';
    const userData = decryptData(token, key);
    
    const resumeFile = request.payload.resume;
    console.log('Start');
    
    try {
        console.log(`Proccess`);
        if (!resumeFile.pipe) {
            throw new Error('Invalid file format');
        }
        const user = await users.findOne({
            where: { email: userData.email }
        });
        
        if (!user.token) {
            return h.response({ message: 'Validation Error' }).code(400);
        }

        const fileExtension = resumeFile.hapi.filename.split('.').pop();
        const fileName = `${user.userId}-${user.firstName}-${Date.now()}.${fileExtension}`;
        const dir = `tmp/${fileName}`;

        console.log(fileName);
        const fileStream = fs.createWriteStream(dir);

        resumeFile.pipe(fileStream);
        
        const folderName = `users-resumes/${user.firstName}`;

        try {
            await bucket.file(folderName).exists();
        } catch (error) {
            await bucket.file(folderName).create({ directory: true });
        }
        await bucket.upload(dir, { destination: `${folderName}/${fileName}` });

        user.resume = `https://storage.googleapis.com/${bucketName}/${folderName}/${fileName}`;
        fs.unlinkSync(dir);
        await user.save();

        const text = await parsePDF(user);
        const predict = await predictHandler(text);

        const dataArray = Object.entries(predict).map(([key, value]) => ({ key, value }));
        dataArray.sort((a, b) => b.value - a.value);
        const top10 = dataArray.slice(0, 10);
        const result = top10.reduce((acc, cur) => {acc[cur.key] = cur.value; return acc;}, {});

        user.predict = result;
        await user.save();

        return h.response({ message: 'Success Adding Resume' }).code(200);
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err}).code(400);
    } 
}

const getResume = async (request, h) => {
    const token = request.headers['token'];
    try {
        const key = 'Jobsterific102723';
        const userData = decryptData(token, key);

        const user = await users.findOne({
            where: {
                email: userData.email,
            }
        });
        if (!user.token) {
            return h.response({ message: 'Validation Error' }).code(400);
        }
        
        const folder = `demo-jobsterific/users-resumes/${user.firstName}`
        const resume = user.resume;
        const fileName = path.basename(resume);

        const resumeUrl = await generateV4ReadSignedUrl(folder, fileName);
        return h.response({ resume: resumeUrl });
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err}).code(400);
    }
}
const getResumeforCustomer = async (user) => {
    try {
        const folder = `demo-jobsterific/users-resumes/${user.firstName}`
        const resume = user.resume;
        const fileName = path.basename(resume);

        const resumeUrl = await generateV4ReadSignedUrl(folder, fileName);
        return resumeUrl;
    } catch (err) {
        return h.response({ message: 'Terjadi kesalahan', err}).code(400);
    }
}
const deleteResume = async (request, h) => {
    const token = request.headers['token'];
    try {
        const key = 'Jobsterific102723';
        const userData = decryptData(token, key);

        const user = await users.findOne({
            where: {
                email: userData.email,
            }
        });
        if (!user.token) {
            return h.response({ message: 'Validation Error' }).code(400);
        }
        user.resume = null;
        await user.save();
        return h.response({ message: "Success Deleting Resume" }).code(200);

    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err}).code(400);
    }
}
const parsePDF = async (user) => {
    try {

        const folder = `demo-jobsterific/users-resumes/${user.firstName}`
        const resume = user.resume;
        const fileName = path.basename(resume);
        const resumeUrl = await generateV4ReadSignedUrl(folder, fileName);

        const { data: pdfContent } = await axios.get(resumeUrl, { responseType: 'arraybuffer' });

        const data = await pdf(pdfContent);
        const text = data.text.replace(/\n/g, ' ');

        return text;
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err }).code(400);
    }
}

async function generateV4ReadSignedUrl(folder, fileName) {
    // These options will allow temporary read access to the file
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    };
  
    // Get a v4 signed URL for reading the file
    const [url] = await client
      .bucket(folder)
      .file(fileName)
      .getSignedUrl(options);

    return url;
  }
 
module.exports = {
    getResume,
    uploadResume,
    deleteResume,
    parsePDF,
    getResumeforCustomer
};