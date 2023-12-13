const { where } = require('sequelize');
const { users, batchs, applyments } = require('../../models'); 
const CryptoJS = require('crypto-js');

const encryptData = (data, key) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

const decryptData = (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
//User membuat permohonan applyment
const createApplyment = async (request, h) => {
    const token = request.headers['token'];
    const {batchId} =  request.payload;
    try {
        const key = 'Jobsterific102723';
        const userData = decryptData(token, key);

        const user = await users.findOne({
            where: {
                email: userData.email,
            }
        });
        
        if (!user && user.email != userData.email) {
            return h.response({ message: 'Validation Error' }).code(400);
        }

        const newApplyment = await applyments.create({
            userId: user.userId,
            batchId: batchId,
            status: false // asumsi status awal adalah false
        })

        return h.response({ user, newApplyment }).code(200);
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        throw err;
    }
};

//viewing all applyment, admin side
const viewAllApplyment = async (request, h) => {
    try {
   
        const applymentsData = await applyments.findAll();

        const applymentsWithUserData = applymentsData.map(async (applyment) => {
            const user = await users.findOne({
                where: {
                    userId: applyment.userId,
                },
            });
            const applymentWithUser = {
                applymentId: applyment.applymentId,
                user: {
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    job: user.job,
                    sex: user.sex,
                    address: user.address,
                    website: user.website,
                    description: user.description,
                    phone: user.phone,
            
                },
            };

            return applymentWithUser;
        });
        const applymentsWithUserDataResolved = await Promise.all(applymentsWithUserData);
        return h.response({ applyments: applymentsWithUserDataResolved }).code(200);
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Internal Server Error' }).code(500);
    }
};


//viewing applyment by user id
const viewApplymentByUID = async (request, h) => {
    const token = request.headers['token'];
    try {
        const key = 'Jobsterific102723';
        const userData = decryptData(token, key);

        const user = await users.findOne({
            where: {
                email: userData.email,
            }
        });
        
        if (!user || user.email !== userData.email) {
            return h.response({ message: 'Validation Error' }).code(400);
        }

        const applyment = await applyments.findAll({
            where: {
                userId: user.userId
            }
        });

        // Map the applyment data to include user information
        const mappedApplyment = applyment.map(item => ({
            applyId: item.applyId,
            userId: item.userId,
            batchId: item.batchId,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                job: user.job,
                sex: user.sex,
                address: user.address,
                phone :user.phone,
                
            }
        }));

        return h.response({ applyment: mappedApplyment }).code(200);
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        throw err;
    }
};

//viewing all applyment by batch id @batch
const viewApplymentByBID = async (request, h) => {
    const token = request.headers['token'];
    const { batchId } = request.payload;

    try {
        const key = 'Jobsterific102723';
        const userData = decryptData(token, key);

        const user = await users.findOne({
            where: {
                email: userData.email,
            }
        });

        if (!user || user.email !== userData.email) {
            return h.response({ message: 'Validation Error' }).code(400);
        }

        const applyment = await applyments.findAll({
            where: {
                batchId: batchId
            },
            include: [
                {
                    model: users,
                    attributes: ['firstName', 'lastName', 'email', 'job', 'sex', 'address', 'phone'],
                }
            ]
        });

        return h.response({ applyment }).code(200);
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        throw err;
    }
};


module.exports = {
    createApplyment,
    viewAllApplyment,
    viewApplymentByUID,
    viewApplymentByBID
}
