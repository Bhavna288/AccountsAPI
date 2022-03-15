const express = require('express');
const router = express.Router();

const itemsInPurchaseController = require('../controllers/itemsInPurchase.controller');

// Submits or creates a itemsInPurchase 
router.post('/add', itemsInPurchaseController.addItemsInPurchase);
// get all data
router.get('/getall', itemsInPurchaseController.getAllItemsInPurchase);
// get itemsInPurchase  by id
router.post('/getbyid', itemsInPurchaseController.getItemsInPurchaseById);
// updates a itemsInPurchase 
router.put('/update', itemsInPurchaseController.updateItemsInPurchase);
// delete a itemsInPurchase 
router.delete('/delete', itemsInPurchaseController.deleteItemsInPurchase);

module.exports = router;