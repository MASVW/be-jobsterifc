const { users } = require('../../models'); // Ganti dengan path yang benar ke file models/users.js
const CryptoJS = require("crypto-js");

const key = "Jobsterific102723"; // Ganti dengan kunci rahasia Anda

const encryptData = (data, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

const decryptData = (ciphertext, key) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Ambil data dari SQLite
const getAdmin = async () => {
    try {
        const adminData = await users.findAll();
        return usersData;
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        throw err;
    }
};

const registerAdmin = async (req, h) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    // Validasi data
    if (!email.includes("@")) {
      return h.status(400).json({ error: "Email tidak valid" });
    }

    if (password.length < 6) {
      return h.status(400).json({ error: "Password harus lebih dari 6 karakter" });
    }

    const newAdmin = await users.create({
      firstName,
      lastName,
      email,
      password,
      isAdmin: true,
    });

    return h.response(newAdmin).code(201);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint POST /api/admins/login (Login Admin)

const loginAdmin = async (req, h) => {
  try {
    const { email, password } = req.body;

    const admin = await users.findOne({
      where: {
        email,
        password,
        isAdmin: true,
      },
    });

    if (!admin) {
      return h.status(404).json({ error: "Admin tidak ditemukan" });
    }

    const token = encryptData(admin.id, key);

    return h.response({ token }).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint GET /api/admins/customers (Get All Customers)

const AdmingetCustomers = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const page = req.query.page || 1;
    const per_page = req.query.per_page || 10;

    const customers = await users.findAll({
      where: { isCustomer: true },
      orderBy: {
        firstName: "asc",
      },
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    return h.response(customers).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

      const registerBatch = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const {
      name,
      start_date,
      end_date,
      status,
    } = req.body;

    // Validasi parameter status
    if (!["open", "closed", "processed"].includes(status)) {
      return h.status(400).json({ error: "Parameter status harus berupa salah satu dari `open`, `closed`, atau `processed`" });
    }

    await Batch.create({
      name,
      start_date,
      end_date,
      status,
    });

    return h.response({ message: "Batch berhasil ditambahkan" }).code(201);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

const logoutAdmin = async (req, h) => {
  try {
    const token = req.headers["Authorization"];

    // Hapus token dari sistem
    await users.update({
      token: null,
    }, { where: { token } });

    return h.response({ message: "Berhasil keluar" }).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint GET /api/admins/applyments (Get All Applications)

const getApplyments = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const page = req.query.page || 1;
    const per_page = req.query.per_page || 10;

    const applyments = await Applyment.findAll({
      where: { isProcessed: false },
      orderBy: {
        createdAt: "desc",
      },
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    return h.response(applyments).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint GET /api/admins/applyments/:applyId (Get Application)

const getApplyment = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const applyId = req.params.applyId;

    const applyment = await Applyment.findOne({
      where: { id: applyId },
    });

    if (!applyment) {
      return h.status(404).json({ error: "Lamaran kerja tidak ditemukan" });
    }

    return h.response(applyment).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint GET /api/admins/candidates (Get All Candidates)

const AdmingetCandidates = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const page = req.query.page || 1;
    const per_page = req.query.per_page || 10;

    const candidates = await users.findAll({
      where: { isCustomer: false },
      orderBy: {
        firstName: "asc",
      },
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    return h.response(candidates).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint PUT /api/admins/candidates/{candidateId} (Update Candidate)

const AdminupdateCandidate = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const candidateId = req.params.candidateId;
    const {
      firstName,
      lastName,
      email,
      job,
      address,
    } = req.body;

    await users.update(
      {
        firstName,
        lastName,
        email,
        job,
        address,
      },
      { where: { id: candidateId } }
    );

    return h.response({ message: "Data kandidat berhasil diperbarui" }).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint PUT /api/admins/candidates/password/{candidateId} (Update Candidate Password)

const AdminupdateCandidatePassword = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const candidateId = req.params.candidateId;
    const { password } = req.body;

    // Validasi password
    if (password.length < 6) {
      return h.status(400).json({ error: "Password harus lebih dari 6 karakter" });
    }

    await users.update(
      {
        password,
      },
      { where: { id: candidateId } }
    );

    return h.response({ message: "Password kandidat berhasil diperbarui" }).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint PUT /api/admins/candidates/status/{candidateId} (Update Candidate Status)

const AdminupdateCandidateStatus = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const candidateId = req.params.candidateId;
    const { status } = req.body;

    await users.update(
      {
        status,
      },
      { where: { id: candidateId } }
    );

    return h.response({ message: "Status kandidat berhasil diperbarui" }).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint DELETE /api/admins/candidates/{candidateId} (Delete Candidate)

const AdmindeleteCandidate = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const candidateId = req.params.candidateId;

    await users.destroy({
      where: { id: candidateId },
    });

    return h.response({ message: "Kandidat berhasil dihapus" }).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint POST /api/admins/customers (Create Customer)

const AdmincreateCustomer = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const {
      firstName,
      lastName,
      email,
      password,
      address,
    } = req.body;

    // Validasi data
    if (!email.includes("@")) {
      return h.status(400).json({ error: "Email tidak valid" });
    }

    if (password.length < 6) {
      return h.status(400).json({ error: "Password harus lebih dari 6 karakter" });
    }

    const newCustomer = await users.create({
      firstName,
      lastName,
      email,
      password,
      address,
      isCustomer: true,
    });

    return h.response(newCustomer).code(201);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint PUT /api/admins/customers/{customerId} (Update Customer)

const AdminupdateCustomer = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const customerId = req.params.customerId;
    const {
      firstName,
      lastName,
      email,
      password,
      address,
    } = req.body;

    await users.update(
      {
        firstName,
        lastName,
        email,
        password,
        address,
      },
      { where: { id: customerId } }
    );

    return h.response({ message: "Data Candicate berhasil diperbarui" }).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

// Endpoint DELETE /api/admins/customers/{customerId} (Delete Customer)

const AdmindeleteCustomer = async (req, h) => {
  try {
    const token = decryptData(req.headers["Authorization"], key);
    const admin = await users.findOne({
      where: { token },
    });

    if (!admin) {
      return h.status(401).json({ error: "Token tidak valid" });
    }

    const customerId = req.params.customerId;

    await users.destroy({
      where: { id: customerId, isCustomer: true },
    });

    return h.response({ message: "Candicate berhasil dihapus" }).code(200);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

module.exports = {
  getAdmin,
  registerAdmin,
  loginAdmin,
  AdmingetCustomers,
  registerBatch,
  getApplyments,
  getApplyment,
  logoutAdmin,
  AdmindeleteCandidate,
  AdmincreateCustomer,
  AdminupdateCustomer,
  AdmindeleteCustomer,
  AdmingetCandidates,
  AdminupdateCandidate,
  AdminupdateCandidatePassword,
  AdminupdateCandidateStatus,
};
