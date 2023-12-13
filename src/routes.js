//routes boleh diisi disini yaa
const {getUser, createUser, loginUser, getCurrentUser, logoutUser, updateUser, getBatch} = require('./user/handler');
const {getResume, resume, deleteResume, parsePDF, parseAllPdf} = require('./resume/handler');
const {createApplyment, viewAllApplyment, viewApplymentByUID, viewApplymentByBID} = require('./applyment/handler');
const {
    getAdmin,
    registerAdmin,
    loginAdmin,
    logoutAdmin,

   
    AdminGetBatch,
    AdminUpdateBatch,
    AdminDeleteBatch,
   

    AdmingetApplyments,
    AdminUpdateApplyment,
    AdminDeleteApplyment,

    AdmingetCandidates,
    AdminupdateCandidatePassword,
    AdmindeleteCandidate,

    AdmingetCustomers,
    AdminupdateCustomer,
    AdmindeleteCustomer,
        } = require('./admin/handler');

const { 
    getCustomer,
    registerCustomer,
    loginCustomer,
    getCustomerById,
    updateCustomer,
    createCampaign,
    getCampaign,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
    customerLogout
} = require("./costumer/handler");
const routes = [
    //user
    {
        method: 'GET',
        path: '/',
        handler: getUser
    },
    {
        // CreateNew User
        method: 'POST',
        path: "/api/users",
        handler: createUser
    },
    {
        // Login
        method: 'POST',
        path: "/api/users/login",
        handler: loginUser
    },
    {
        //Get User
        method: 'GET',
        path: "/api/users",
        handler: getCurrentUser
    },
    {
        //Edit User
        method: 'PUT',
        path: "/api/users/current",
        handler: updateUser
    },
    {
        // Logout User
        method: 'DELETE',
        path: "/api/users/logout",
        handler: logoutUser
    },
// Batch
    {
        //Get Batch
        method: 'GET',
        path: "/api/users/batch",
        handler: getBatch
    },

// Resume

    {
        //Adding Resume
        method: 'POST',
        path: "/api/users/resume",
        handler: resume
    },
    {
        //Reupload Resume
        method: 'PUT',
        path: "/api/users/resume",
        handler: resume
    },
    {
        //Get Resume
        method: 'GET',
        path: "/api/users/resume",
        handler: getResume
    },
    {
        //Delete Resume
        method: 'DELETE',
        path: "/api/users/resume",
        handler: deleteResume
    },
    {
        //Parse PDF
        method: 'POST',
        path: "/api/users/resume/parse",
        handler: parsePDF
    },
    {
        //Parse All Resume 
        method: 'GET',
        path: "/api/users/resume/parse",
        handler: parseAllPdf
    },

// Applyment
    
    {
        //create applyment
        method: 'POST',
        path: "/api/applyment",
        handler: createApplyment
    },
    {
        //view all applyment
        method: 'GET',
        path: "/api/applyment",
        handler: viewAllApplyment
    },
    {
        //viewing applyment by user id
        method: 'GET',
        path: "/api/applyment/user",
        handler: viewApplymentByUID
    },
    {
        //viewing all applyment by batch id @batch
        method: 'POST',
        path: "/api/applyment/batch",
        handler: viewApplymentByBID
    },
//admin,
    {
        // getting Admin
        method: 'GET',
        path: '/api/admin',
        handler: getAdmin,
    },
    {
        method: 'POST',
        path: '/api/admins/register',
        handler: registerAdmin,
    },
    {
        method: 'POST',
        path: '/api/admins/login',
        handler: loginAdmin,
    },
    {
        method: 'POST',
        path: '/api/admins/logout',
        handler: logoutAdmin,
    },
   

////Batch Admin


    {
        method: 'GET',
        path: '/api/admins/batch',
        handler: AdminGetBatch,
    },
    {
        method: 'PUT',
        path: '/api/admins/batch/{batchId}',
        handler: AdminUpdateBatch,
    },
    {
        method: 'DELETE',
        path: '/api/admins/batch/{batchId}',
        handler: AdminDeleteBatch,
    },


////Applyments Admin
    {
        method: 'GET',
        path: '/api/admins/applyments',
        handler: AdmingetApplyments,
    },
    {
        method: 'PUT',
        path: '/api/admins/applyments/{applyId}',
        handler: AdminUpdateApplyment,
    },
     {
        method: 'DELETE',
        path: '/api/admins/applyments/{applyId}',
        handler: AdminDeleteApplyment,

    },

////Candidate Admin
    {
        method: 'GET',
        path: '/api/admins/candidates',
        handler: AdmingetCandidates,
    },
 
    {
        method: 'PUT',
        path: '/api/admins/candidates/password/{candidateId}',
        handler: AdminupdateCandidatePassword,
    },
    {
        method: 'DELETE',
        path: '/api/admins/candidates/{candidateId}',
        handler: AdmindeleteCandidate,
    },

    ////Costumer Admin
 
    {
        method: 'GET',
        path: '/api/admins/customers',
        handler: AdmingetCustomers,
    },
    {
        method: 'PUT',
        path: '/api/admins/customers/{customerId}',
        handler: AdminupdateCustomer,
    },
    {
        method: 'DELETE',
        path: '/api/admins/customers/{customerId}',
        handler: AdmindeleteCustomer,
    },
   


    //Costumer
    {
        method: "GET",
        path: "/api/customers",
        handler: getCustomer,
    },
    {
        method: "POST",
        path: "/api/customers/register",
        handler: registerCustomer,
    },
    {
        method: "POST",
        path: "/api/customers/login",
        handler: loginCustomer,
    },
    {
        method: "GET",
        path: "/api/customers/{customerId}",
        handler: getCustomerById,
    },
    {
        method: "PUT",
        path: "/api/customers/{customerId}",
        handler: updateCustomer,
    },
    {
        method: "POST",
        path: "/api/customers/logout",
        handler: customerLogout,
    },

//campaign
    {
        method: 'GET',
        path: '/api/customers/campaigns',
        handler: getCampaign,
    },
    {
        method: "GET",
        path: "/api/customers/campaigns/{batchId}",
        handler: getCampaignById,
    },
    {
        method: "POST",
        path: "/api/customers/campaigns",
        handler: createCampaign,
    },
    {
        method: "PUT",
        path: "/api/customers/campaigns/{batchId}",
        handler: updateCampaign,
    },
    {
        method: "DELETE",
        path: "/api/customers/campaigns/{batchId}",
        handler: deleteCampaign,
    }
];

module.exports = routes;
