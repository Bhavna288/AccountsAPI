const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item.controller');

// Submits or creates an item
router.post('/add', itemController.addItem);
// get all data
router.get('/getall', itemController.getAllItem);
// get item by id
router.post('/getbyid', itemController.getItemById);
// updates an item
router.put('/update', itemController.updateItem);
// delete an item
router.delete('/delete', itemController.deleteItem);

module.exports = router;