const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const inventoryMasterController = require('../controllers/inventoryMaster.controller');

// Submits or creates an inventoryMaster 
router.post('/add', inventoryMasterController.addInventoryMaster);
// get all data
router.get('/getall', inventoryMasterController.getAllInventoryMaster);
// get inventoryMaster  by id
router.post('/getbyid', inventoryMasterController.getInventoryMasterById);
// updates an inventoryMaster 
router.put('/update', inventoryMasterController.updateInventoryMaster);
// delete an inventoryMaster 
router.delete('/delete', inventoryMasterController.deleteInventoryMaster);

module.exports = router;