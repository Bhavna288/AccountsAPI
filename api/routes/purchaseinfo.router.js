const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const purchaseInfoController = require('../controllers/purchaseInfo.controller');

// Submits or creates a purchaseInfo 
router.post('/add', API.validateKey, purchaseInfoController.addPurchaseInfo);
// get all data
router.get('/getall', API.validateKey, purchaseInfoController.getAllPurchaseInfo);
// get purchaseInfo  by id
router.post('/getbyid', API.validateKey, purchaseInfoController.getPurchaseInfoById);
// updates a purchaseInfo 
router.put('/update', API.validateKey, purchaseInfoController.updatePurchaseInfo);
// delete a purchaseInfo 
router.delete('/delete', API.validateKey, purchaseInfoController.deletePurchaseInfo);

module.exports = router;