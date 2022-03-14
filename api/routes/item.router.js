const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const itemController = require('../controllers/item.controller');

// Submits or creates an item
router.post('/add', API.validateKey, itemController.addItem);
// get all data
router.get('/getall', API.validateKey, itemController.getAllItem);
// get item by id
router.post('/getbyid', API.validateKey, itemController.getItemById);
// updates an item
router.put('/update', API.validateKey, itemController.updateItem);
// delete an item
router.delete('/delete', API.validateKey, itemController.deleteItem);

module.exports = router;