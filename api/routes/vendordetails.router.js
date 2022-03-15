const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const vendorDetailsController = require('../controllers/vendorDetails.controller');

// Submits or creates an vendor details
router.post('/add', vendorDetailsController.addVendorDetails);
// get all data
router.get('/getall', vendorDetailsController.getAllVendorDetails);
// get vendor details by id
router.post('/getbyid', vendorDetailsController.getVendorDetailsById);
// updates an vendor details
router.put('/update', vendorDetailsController.updateVendorDetails);
// delete an vendor details
router.delete('/delete', vendorDetailsController.deleteVendorDetails);

module.exports = router;