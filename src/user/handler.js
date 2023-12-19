const { users, batchs } = require('../../models'); 
const { predictHandler } = require('../ml/handler');
const { Sequelize } = require('sequelize');
const { parsePDF } = require('../resume/handler');
const CryptoJS = require('crypto-js');

const encryptData = (data, key) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

const decryptData = (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const getUser = async () => {
    try {
        const usersData = await users.findAll();
        return usersData;
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        throw err;
    }
};
 
const createUser = async (request, h) => {
    const {
        firstName, 
        lastName, 
        email, 
        password, 
        job, 
        sex, 
        address,
        phone
    } = request.payload;

    try {
        const existingUser = await users.findOne({ where: { email } });

        if (existingUser) {
            // If email already exists, return a validation error
            return h.response({ message: 'Email is already in use' }).code(400);
        }
        
        const key = 'Jobsterific102723';
        const encryptedData = encryptData(
            password
        , key);

        await users.create({
            firstName, 
            lastName, 
            email, 
            password: encryptedData, 
            job, 
            sex, 
            address,
            phone
        });

        return h.response({ message: 'Success Register' }).code(200);
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error' }).code(400);
    }
}

const loginUser = async (request, h) => {
    const {
        email, 
        password,
    } = request.payload;

    try {
        const key = 'Jobsterific102723';
        
        const user = await users.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return h.response({ message: 'Validation Error' }).code(400);
        }

        const passwordDecrypt = decryptData(user.password, key);

        if (password == passwordDecrypt) {
            const encryptedData = encryptData({
                email: user.email,
                password: user.password,
                firstName: user.firstName
            }, key);
    
            user.token = encryptedData;
            await user.save();
    
            return h.response({ message: `Success Login`, user}).code(200);
        }
        else {
            return h.response({ message: 'Password Invalid' }).code(400);
        }
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error' }).code(400);
    }
}

const getCurrentUser = async (request, h) => {
    const token = request.headers['token'];

    try {
        const key = 'Jobsterific102723';
        const userData = decryptData(token, key);

        const user = await users.findOne({
            where: {
                email: userData.email,
                token: token,
            }
        });

        // Periksa apakah token di header sesuai dengan token yang masih ada di database
        if (!user.token) {
            return h.response({ message: 'Validation Error' }).code(400);
        }

        // Periksa apakah token masih ada di dalam tabel user token
        const userToken = await users.findOne({
            where: {
                userId: user.userId,
                token: token,
            }
        });

        if (!userToken) {
            // Token tidak ditemukan, mungkin sudah logout
            return h.response({ message: 'Validation Error' }).code(400);
        }

        return h.response({
            user
        }).code(200);

    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err }).code(400);
    }
};

const updateUser = async (request, h) => {
    const token = request.headers['token'];
    const {
        firstName, 
        lastName, 
        email, 
        password, 
        job, 
        sex, 
        address,
        phone
    } = request.payload;

    try {
        const user = await users.findOne({
            where: {
                token: token,
            }
        });

        if (!user) {
            return h.response({ message: 'Validation Error' }).code(400);
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.job = job;
        user.sex = sex;
        user.address = address;
        user.phone = phone;
        await user.save();

        return h.response({ message: 'Success Update' , user}).code(200);
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error' }).code(400);
    }
}


const logoutUser = async (request, h) => {
    const token = request.headers['token'];

    try {
        const user = await users.findOne({
            where: {
                token : token
            }
        });

        if (!user) {
            return h.response({ message: 'Validation Error' }).code(400);
        }

        user.token = null;
        await user.save();

        return h.response({ message: 'Success Log Out' }).code(200);
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err}).code(400);
    }
}
  // tes 5

  const getBatch = async (request, h) => {
    const token = request.headers['token'];
  
    try {
      const key = 'Jobsterific102723';
      const userData = decryptData(token, key);
  
      const user = await users.findOne({
        where: {
          email: userData.email,
          token: token,
        },
      });
  
      if (!user.token) {
        return h.response({ message: 'Invalid token' }).code(401);
      }

      if (!user.predict) {
          const batches = await batchs.findAll();
          return h.response({ batches }).code(200);
        } else {
            
            const batch = await batchs.findAll();
            const getRecommendations = (userPredict, campaignPredicts) => {
            return batch
              .map(campaign => {
                const campaignPredict = JSON.parse(campaign.predict);
                const campaignPredictValues = Object.values(campaignPredict);
          
                // Normalisasi userPredict dan campaignPredictValues
                const maxUserPredict = Math.max(...userPredict);
                const normalizedUserPredict = userPredict.map(val => val / maxUserPredict);
          
                const maxCampaignPredict = Math.max(...campaignPredictValues);
                const normalizedCampaignPredict = campaignPredictValues.map(val => val / maxCampaignPredict);
          
                // Hitung skor dengan dot product
                const dotProduct = normalizedUserPredict.reduce((acc, val, i) => {
                  return acc + val * normalizedCampaignPredict[i];
                }, 0);
          
                // Assign skor ke kampanye
                return { ...campaign.dataValues, score: dotProduct };
              })
              .sort((a, b) => b.score - a.score);
          };
          
          
  
        const batches = getRecommendations(
          Object.values(JSON.parse(user.predict)),
          batch.map(campaign => JSON.parse(campaign.predict))
        );
  
        return h.response({ batches }).code(200);
      }
    } catch (err) {
      console.error('Error:', err);
      return h.response({ message: 'Validation Error', error: err.message }).code(400);
    }
  };

  const searchBatch = async (request, h) => {
    const token = request.headers['token'];
    const { search } = request.query;
  
    try {
      const key = 'Jobsterific102723';
      const userData = decryptData(token, key);
  
      const user = await users.findOne({
        where: {
          email: userData.email,
          token: token,
        },
      });
  
      if (!user.token) {
        return h.response({ message: 'Invalid token' }).code(401);
      }

      const batches = await batchs.findAll({
        where: {
            campaignName: { [Sequelize.Op.like]: `%${search}%` },
            campaignDesc: { [Sequelize.Op.like]: `%${search}%` },
        },
      });

        return h.response({ batches }).code(200);
      }
    catch (err) {
      console.error('Error:', err);
      return h.response({ message: 'Validation Error', error: err.message }).code(400);
    }
  };
  
  
module.exports = {
    getUser, 
    createUser, 
    loginUser,
    getCurrentUser,
    updateUser,
    logoutUser,
    getBatch,
    searchBatch
};
