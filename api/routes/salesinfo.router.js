const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const salesInfoController = require('../controllers/salesInfo.controller');

// Submits or creates a salesInfo 
router.post('/add', salesInfoController.addSalesInfo);
// get all data
router.get('/getall', salesInfoController.getAllSalesInfo);
// get salesInfo  by id
router.post('/getbyid', salesInfoController.getSalesInfoById);
// updates a salesInfo 
router.put('/update', salesInfoController.updateSalesInfo);
// delete a salesInfo 
router.delete('/delete', salesInfoController.deleteSalesInfo);

module.exports = router;