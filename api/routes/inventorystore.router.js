const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const inventoryStoreController = require('../controllers/inventoryStore.controller');

// Submits or creates an inventoryStore 
router.post('/add', inventoryStoreController.addInventoryStore);
// get all data
router.get('/getall', inventoryStoreController.getAllInventoryStore);
// get inventoryStore  by id
router.post('/getbyid', inventoryStoreController.getInventoryStoreById);
// updates an inventoryStore 
router.put('/update', inventoryStoreController.updateInventoryStore);
// delete an inventoryStore 
router.delete('/delete', inventoryStoreController.deleteInventoryStore);

module.exports = router;