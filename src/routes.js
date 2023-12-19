//routes boleh diisi disini yaa
const {getUser, createUser, loginUser, getCurrentUser, logoutUser, updateUser, getBatch, searchBatch} = require('./user/handler');
const {getResume, uploadResume, deleteResume, parsePDF} = require('./resume/handler');
const {createApplyment, viewAllApplyment, viewApplymentByUID, viewApplymentByBID} = require('./applyment/handler');
const { getCandidates, getCustomer, registerCustomer, loginCustomer, getCustomerById, updateCustomer, createCampaign, getCampaign, getCampaignByUserId, updateCampaign, deleteCampaign, customerLogout, getCandidatesSpecified} = require("./costumer/handler");
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
    {
        //Search Batch
        method: 'GET',
        path: "/api/users/batch/search",
        handler: searchBatch
    },
// Resume
    {
        //Adding Resume
        method: 'POST',
        path: "/api/users/resume",
        options: {
            payload: {
              output: 'stream',
              parse: true,
              multipart: true
            }},
        handler: uploadResume
    },
    {
        //Adding Resume
        method: 'PUT',
        path: "/api/users/resume",
        options: {
            payload: {
              output: 'stream',
              parse: true,
              multipart: true
            }},
        handler: uploadResume
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
        path: '/api/customers/candidates',
        handler: getCandidates
    },
    {
        method: 'GET',
        path: '/api/customers/campaigns/candidate/{userId}',
        handler: getCandidatesSpecified
    },
    {
        method: 'GET',
        path: '/api/customers/campaigns',
        handler: getCampaign,
    },
    {
        method: "GET",
        path: "/api/customers/allCampaign",
        handler: getCampaignByUserId,
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
