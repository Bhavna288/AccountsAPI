const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer.controller');

// Submits or creates a customer 
router.post('/add', customerController.addCustomer);
// get all data
router.get('/getall', customerController.getAllCustomer);
// get customer  by id
router.post('/getbyid', customerController.getCustomerById);
// updates a customer 
router.put('/update', customerController.updateCustomer);
// delete a customer 
router.delete('/delete', customerController.deleteCustomer);

module.exports = router;