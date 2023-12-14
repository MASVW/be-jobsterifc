const { users } = require('../../models'); 

const CryptoJS = require('crypto-js');
const fs = require('fs');
const link = require('path');

const pdf = require('pdf-parse');

const { Storage } = require("@google-cloud/storage");
const key = require("../../bucket.json");
const client = new Storage({
    projectId: 'ninth-arena-403511',
    credentials: key,
  });
const bucketName = "demo-jobsterific";
const bucket = client.bucket(bucketName);

const decryptData = (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
//TBC
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
        const path = `tmp/${fileName}`;

        console.log(fileName);
        const fileStream = fs.createWriteStream(path);

        resumeFile.pipe(fileStream);
        
        const folderName = `users-resumes/${user.firstName}`;

        try {
            await bucket.file(folderName).exists();
        } catch (error) {
            await bucket.file(folderName).create({ directory: true });
        }
        await bucket.upload(path, { destination: `${folderName}/${fileName}` });
        console.log('Folder Bucket');

        user.resume = `https://storage.googleapis.com/${bucketName}/${folderName}/${fileName}`;
        await user.save();

        return h.response({ message: 'Success Adding Resume' }).code(200);
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err}).code(400);
    } 
    // finally {
    //     fs.unlinkSync(path);
    //   }
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
        return h.response({ resume: user.resume}).code(200);

    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err}).code(400);
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
const parsePDF = async (request, h) => {
    const token = request.headers['token'];
    try {
        const key = 'Jobsterific102723';
        const userData = decryptData(token, key);

        const user = await users.findOne({
            where: {
                email: userData.email,
            }
        });

        if (!user) {
            return h.response({ message: 'Validation Error' }).code(400);
        }

        // const resume = `demo-jobsterific/users-resumes/${user.firstName}`;
        const resume = `demo-jobsterific/users-resumes/Budi`;
        const fileName = "11-Budi-1702537111986.pdf";
        const localFilePath = `tmp/`;

        await downloadFile(resume, fileName, localFilePath);

        return h.response({ message: 'Download successful' });
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err }).code(400);
    }
}

async function downloadFile(bucketName, fileName, localFilePath) {
    const options = {
        destination: localFilePath,
    };

    await client.bucket(bucketName).file(fileName).download(options);

    console.log('Download completed');
}


const parseAllPdf = async (request, h) => {
    try {
        const usersData = await users.findAll();
        //validation
        if (!usersData) {
            return h.response({ message: 'Validation Error' }).code(400);
        }
        
        let allResumes = [];
        for (let userData of usersData) {
            // Jika resume null atau kosong, lanjutkan ke pengguna berikutnya
            if (!userData.resume) {
                continue;
            }

            const dataBuffer = fs.readFileSync(userData.resume);
            const data = await pdf(dataBuffer);
            const text = data.text.replace(/\n/g, ' ');

            allResumes.push({ result: text });
        }

        return h.response({ message: "Success Parsing Resume" , resumes: allResumes}).code(200);

    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err}).code(400);
    }
}
async function downloadFile(bucketName, fileName, localFilePath) {
    const options = {
        destination: localFilePath,
    };

    await client.bucket(bucketName).file(fileName).download(options);

    console.log('Download completed');
}

module.exports = {
    getResume,
    uploadResume,
    deleteResume,
    parsePDF,
    parseAllPdf
};