const { users, batchs } = require('../../models');
const CryptoJS = require('crypto-js');

// Fungsi untuk mengenkripsi data menggunakan AES
const encryptData = (data, key) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

// Fungsi untuk mendekripsi data menggunakan AES
const decryptData = (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Fungsi untuk mengambil data customer dari database
const getCustomer = async () => {
    try {
        const customersData = await users.findAll({
            where: { isCustomer: true },
            order: [
                ['firstName', 'ASC'],
            ],
        });
        return customersData;
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        throw err;
    }
};

// Fungsi untuk mendaftarkan customer baru
const registerCustomer = async (req, h) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        website,
        description
    } = req.payload;

    try {
        // Membuat customer baru dengan isCustomer default sebagai true
        const newCustomer = await users.create({
            firstName,
            lastName,
            email,
            description,
            website,
            phone,
            address,
            password,
            isCustomer: true,
        });

        // Validasi data
        if (!email.includes("@")) {
            return h.response({ error: "Email tidak valid" }).code(400);
        }

        if (password.length < 8) {
            return h.response({ error: "Password harus lebih dari 8 karakter" }).code(400);
        }

        // Mengembalikan data customer yang baru dibuat
        return newCustomer;
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        throw err;
    }
};

// Fungsi untuk login customer
const loginCustomer = async (req, h) => {
    const {
        email,
        password,
    } = req.payload;

    try {
        // Mencari customer di database berdasarkan email dan password
        const customer = await users.findOne({
            where: {
                email: email,
                password: password,
            }
        });

        if (!customer) {
            return h.response({ message: 'Invalid email or password' }).code(400);
        }

        // Mengenkripsi data customer
        const key = 'Jobsterific102723';
        const encryptedData = encryptData({
            email: customer.email,
            password: customer.password,
            firstName: customer.firstName
        }, key);

        // Menyimpan token ke database
        customer.token = encryptedData;
        await customer.save();

        // Mengembalikan data terenkripsi
        return h.response({ message: 'Success Login', customer }).code(200);

    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error' }).code(400);
    }
};

// Fungsi untuk mengambil data customer berdasarkan ID
const getCustomerById = async (req, h) => {
  const token = req.headers['token'];

  try {
      const key = 'Jobsterific102723';
      const customerData = decryptData(token, key);

      // Find customer by email and check if customer is valid
      const customer = await users.findOne({
          where: {
              email: customerData.email,
              isCustomer: true,
              token: token,
          },
      });

      // Periksa apakah token di header sesuai dengan token yang masih ada di database
      if (!customer || customer.token !== token) {
          return h.response({ message: 'Validation Error' }).code(400);
      }

      // Periksa apakah token masih ada di dalam tabel user_token
      const userToken = await users.findOne({
          where: {
              userId: customer.userId,
              token: token,
          }
      });

      if (!userToken) {
          // Token tidak ditemukan, mungkin sudah logout
          return h.response({ message: 'Validation Error' }).code(400);
      }

      return h.response({
          customer
      }).code(200);

  } catch (err) {
      console.error('Error:', err.message);
      return h.response({ message: err.message || 'Internal server error' }).code(500);
  }
};

// Fungsi untuk memperbarui data customer
const updateCustomer = async (req, h) => {
  // Extract token from request headers
  const token = req.headers['token'];

  // Extract customer data from request payload
  const {
    firstName,
    lastName,
    email,
    description,
    website,
    phone,
    address,    
  } = req.payload;

  try {
    // Decrypt token
    const key = 'Jobsterific102723';
    const customerData = decryptData(token, key);

    // Find customer based on token's email
    const customer = await users.findOne({
      where: {
        email: customerData.email,
        isCustomer: true,
        token: token,
      },
    });

    // If customer not found or token mismatch, send 404 response
    if (!customer || customer.token !== token) {
      return h.response({ message: 'Validation Error' }).code(400);
    }

    // Update customer data
    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.email = email;
    customer.description = description;
    customer.website = website;
    customer.phone = phone;
    customer.address = address;

    // Save updated customer data
    await customer.save();

    // Send successful update response with updated customer data
    return h.response({ message: 'Success Update', customer }).code(200);
  } catch (err) {
    console.error('Terjadi kesalahan:', err);
    return h.response({ message: 'Internal server error' }).code(500);
  }
};

// Fungsi untuk membuat campaign
const createCampaign = async (req, h) => {
  const token = req.headers['token'];

  const {
    campaignName,
    campaignDesc,
    campaignPeriod,
    campaignKeyword,
    status,
    startDate,
    endDate,
  } = req.payload;

  try {
    // Decrypt token
    const key = 'Jobsterific102723';
    const userData = decryptData(token, key);

    // Validate token and find user
    const customer = await users.findOne({
      where: {
        email: userData.email,
        isCustomer: true,
        token: token,
      },
    });

    // Validate if user and token are valid
    if (!customer || customer.token !== token) {
      return h.response({ message: 'Invalid token' }).code(401);
    }

    // Create new campaign
    const newCampaign = await batchs.create({
      userId: customer.userId,
      campaignName: campaignName,
      campaignDesc: campaignDesc,
      campaignPeriod: campaignPeriod,
      campaignKeyword: campaignKeyword,
      status: status,
      startDate: startDate,
      endDate: endDate,
    });

    // Send successful create response with new campaign data
    return h.response({ message: 'Success Create Campaign', newCampaign }).code(200);
  } catch (err) {
    console.error('Terjadi kesalahan:', err);
    return h.response({ message: 'Internal server error' }).code(500);
  }
};

//Fungsi untuk mendapat data campaign
const getCampaign = async (request, h) => {
  const token = request.headers['token'];

  try {
    // Validate token and check if the user is an admin
    const key = 'Jobsterific102723';
    const customerData = decryptData(token, key);

    const customer = await users.findOne({
      where: {
        email: customerData.email,
        isCustomer: true,
        token: token,
      },
    });

    // Validate if customer and token are valid
    if (!customer || customer.token !== token) {
      return h.response({ message: 'Invalid token' }).code(401);
    }

    // If validation is successful, get all batches
    const batches = await batchs.findAll();

    return h.response({ 
        batches 
    }).code(200);
  } catch (err) {
    console.error('Error:', err);
    return h.response({ message: 'Validation Error', error: err.message }).code(400);
  }
};

// Fungsi untuk mengambil data campaign berdasarkan ID
const getCampaignById = async (req, h) => {
  const token = req.headers['token'];

  try {
      const key = 'Jobsterific102723';
      const customerData = decryptData(token, key);
      
      const customer = await users.findOne({
          where: {
              email: customerData.email,
              isCustomer: true,
              token: token,
          },
      });

      // Periksa apakah token di header sesuai dengan token yang masih ada di database
      if (!customer || customer.token !== token) {
          return h.response({ message: 'Validation Error' }).code(400);
      }

      // Periksa apakah token masih ada di dalam tabel user_token
      const userToken = await users.findOne({
          where: {
              userId: customer.userId,
              token: token,
          }
      });

      if (!userToken) {
          // Token tidak ditemukan, mungkin sudah logout
          return h.response({ message: 'Validation Error' }).code(400);
      }
      // Ambil data campaign
      const batch = await batchs.findOne({
          where: {
              BatchId: batchId,
              UserId: customer.userId,
          },
      });

      if (!batch) {
          return h.response({ message: 'Campaign not found' }).code(404);
      }

      return h.response({
          batch
      }).code(200);

  } catch (err) {
      console.error('Error:', err.message);
      return h.response({ message: err.message || 'Internal server error' }).code(500);
  }
};

// Fungsi untuk memperbarui data campaign yang ada
const updateCampaign = async (req, h) => {
  // Extract token from request headers
  const token = req.headers['token'];

  // Extract campaign ID from request path
  const batchId = req.params.batchId;

  // Extract campaign data from request payload
  const {
      campaignName,
      campaignDesc,
      campaignPeriod,
      campaignKeyword,
      status,
      startDate,
      endDate,
  } = req.payload;

  try {
      // Decrypt token
      const key = 'Jobsterific102723';
      const userData = decryptData(token, key);

      // Validate token
      if (!userData) {
          return h.response({ message: 'Invalid token' }).code(401);
      }

      // Find user based on token's email
      const user = await users.findOne({
          where: {
              email: userData.email,
              token: token,
          },
      });

      // If user not found or not a customer, send 404 response
      if (!user || !user.isCustomer) {
          return h.response({ message: 'Customer not found' }).code(404);
      }

      // Find campaign based on batch ID
      const batch = await batchs.findOne({
          where: {
              BatchId: batchId,
          },
      });

      // If campaign not found, send 404 response
      if (!batch) {
          return h.response({ message: 'Campaign not found' }).code(404);
      }

      // Update campaign data
      batch.campaignName = campaignName;
      batch.campaignDesc = campaignDesc;
      batch.campaignPeriod = campaignPeriod;
      batch.campaignKeyword = campaignKeyword;
      batch.status = status;
      batch.startDate = startDate;
      batch.endDate = endDate;

      // Save updated campaign
      await batch.save();

      // Send successful update response
      return h.response({ message: 'Success Update' }).code(200);
  } catch (err) {
      console.error('Terjadi kesalahan:', err);
      return h.response({ message: 'Internal server error' }).code(500);
  }
};

// Fungsi untuk menghapus campaign
const deleteCampaign = async (req, h) => {
  // Extract token from request headers
  const token = req.headers['token'];

  // Extract batch ID from request path
  const batchId = req.params.batchId;

  try {
      // Decrypt token
      const key = 'Jobsterific102723';
      const customerData = decryptData(token, key);

      // Validate token
      if (!customerData) {
          return h.response({ message: 'Invalid token' }).code(401);
      }

      // Find customer based on token's email and token
      const customer = await users.findOne({
          where: {
              email: customerData.email,
              token: token,
              isCustomer: true,
          },
      });

      // If customer not found or token doesn't match, send 404 response
      if (!customer || customer.token !== token) {
          return h.response({ message: 'Customer not found' }).code(404);
      }

      // Find batch based on batch ID and user ID
      const batch = await batchs.findOne({
          where: {
              batchId: batchId,
              UserId: customer.userId,
          },
      });

      // If batch not found, send 404 response
      if (!batch) {
          return h.response({ message: 'Batch not found' }).code(404);
      }

      // Delete batch
      await batch.destroy();

      // Send successful delete response
      return h.response({ message: 'Success Delete' }).code(200);
  } catch (err) {
      console.error('Terjadi kesalahan:', err);
      return h.response({ message: 'Internal server error' }).code(500);
  }
};

// Fungsi untuk melakukan logout customer
const customerLogout = async (req, h) => {
    const token = req.headers['token'];

    try {
        // Mencari customer berdasarkan token
        const customer = await users.findOne({
            where: {
                token: token
            }
        });

        if (!customer) {
            return h.response({ message: 'Validation Error' }).code(400);
        }

        // Menghapus token dari database
        customer.token = null;
        await customer.save();

        return h.response({ message: 'Success LogOut' }).code(200);
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        return h.response({ message: 'Validation Error', err }).code(400);
    }
}

module.exports = {
    getCustomer,
    registerCustomer,
    loginCustomer,
    getCustomerById,
    updateCustomer,
    getCampaign,
    getCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    customerLogout,
};
