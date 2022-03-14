const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const vendorDetailsController = require('../controllers/vendorDetails.controller');

// Submits or creates an vendor details
router.post('/add', API.validateKey, vendorDetailsController.addVendorDetails);
// get all data
router.get('/getall', API.validateKey, vendorDetailsController.getAllVendorDetails);
// get vendor details by id
router.post('/getbyid', API.validateKey, vendorDetailsController.getVendorDetailsById);
// updates an vendor details
router.put('/update', API.validateKey, vendorDetailsController.updateVendorDetails);
// delete an vendor details
router.delete('/delete', API.validateKey, vendorDetailsController.deleteVendorDetails);

module.exports = router;