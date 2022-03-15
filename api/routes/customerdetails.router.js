const express = require('express');
const router = express.Router();

const customerDetailsController = require('../controllers/customerDetails.controller');

// Submits or creates a customerDetails 
router.post('/add', customerDetailsController.addCustomerDetails);
// get all data
router.get('/getall', customerDetailsController.getAllCustomerDetails);
// get customerDetails  by id
router.post('/getbyid', customerDetailsController.getCustomerDetailsById);
// updates a customerDetails 
router.put('/update', customerDetailsController.updateCustomerDetails);
// delete a customerDetails 
router.delete('/delete', customerDetailsController.deleteCustomerDetails);

module.exports = router;