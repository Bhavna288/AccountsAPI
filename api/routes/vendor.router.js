const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const vendorController = require('../controllers/vendor.controller');

// Submits or creates a vendor 
router.post('/add', API.validateKey, vendorController.addVendor);
// get all data
router.get('/getall', API.validateKey, vendorController.getAllVendor);
// get vendor  by id
router.post('/getbyid', API.validateKey, vendorController.getVendorById);
// updates a vendor 
router.put('/update', API.validateKey, vendorController.updateVendor);
// delete a vendor 
router.delete('/delete', API.validateKey, vendorController.deleteVendor);

module.exports = router;