const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const itemGroupController = require('../controllers/itemGroup.controller');

// Submits or creates an item group
router.post('/add', API.validateKey, itemGroupController.addItemGroup);
// get all data
router.get('/getall', API.validateKey, itemGroupController.getAllItemGroup);
// get item group by id
router.post('/getbyid', API.validateKey, itemGroupController.getItemGroupById);
// updates an item group
router.put('/update', API.validateKey, itemGroupController.updateItemGroup);
// delete an item group
router.delete('/delete', API.validateKey, itemGroupController.deleteItemGroup);

module.exports = router;