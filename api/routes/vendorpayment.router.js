const express = require('express');
const router = express.Router();

const vendorPaymentController = require('../controllers/vendorPayment.controller');

// Submits or creates a vendorPayment 
router.post('/add', vendorPaymentController.addVendorPayment);
// get all data
router.get('/getall', vendorPaymentController.getAllVendorPayment);
// get vendorPayment  by id
router.post('/getbyid', vendorPaymentController.getVendorPaymentById);
// updates a vendorPayment 
router.put('/update', vendorPaymentController.updateVendorPayment);
// delete a vendorPayment 
router.delete('/delete', vendorPaymentController.deleteVendorPayment);

module.exports = router;