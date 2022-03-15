const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const vendorController = require('../controllers/vendor.controller');

// Submits or creates a vendor 
router.post('/add', vendorController.addVendor);
// get all data
router.get('/getall', vendorController.getAllVendor);
// get vendor  by id
router.post('/getbyid', vendorController.getVendorById);
// updates a vendor 
router.put('/update', vendorController.updateVendor);
// delete a vendor 
router.delete('/delete', vendorController.deleteVendor);

module.exports = router;