const express = require('express');
const router = express.Router();

const itemsInOrderController = require('../controllers/itemsInOrder.controller');

// Submits or creates a itemsInOrder 
router.post('/add', itemsInOrderController.addItemsInOrder);
// get all data
router.get('/getall', itemsInOrderController.getAllItemsInOrder);
// get itemsInOrder  by id
router.post('/getbyid', itemsInOrderController.getItemsInOrderById);
// updates a itemsInOrder 
router.put('/update', itemsInOrderController.updateItemsInOrder);
// delete a itemsInOrder 
router.delete('/delete', itemsInOrderController.deleteItemsInOrder);

module.exports = router;