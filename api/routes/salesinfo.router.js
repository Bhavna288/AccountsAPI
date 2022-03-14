const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const salesInfoController = require('../controllers/salesInfo.controller');

// Submits or creates a salesInfo 
router.post('/add', API.validateKey, salesInfoController.addSalesInfo);
// get all data
router.get('/getall', API.validateKey, salesInfoController.getAllSalesInfo);
// get salesInfo  by id
router.post('/getbyid', API.validateKey, salesInfoController.getSalesInfoById);
// updates a salesInfo 
router.put('/update', API.validateKey, salesInfoController.updateSalesInfo);
// delete a salesInfo 
router.delete('/delete', API.validateKey, salesInfoController.deleteSalesInfo);

module.exports = router;