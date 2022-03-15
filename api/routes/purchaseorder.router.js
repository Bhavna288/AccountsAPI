const express = require('express');
const router = express.Router();

const purchaseOrderController = require('../controllers/purchaseOrder.controller');

// Submits or creates a purchaseOrder 
router.post('/add', purchaseOrderController.addPurchaseOrder);
// get all data
router.get('/getall', purchaseOrderController.getAllPurchaseOrder);
// get purchaseOrder  by id
router.post('/getbyid', purchaseOrderController.getPurchaseOrderById);
// updates a purchaseOrder 
router.put('/update', purchaseOrderController.updatePurchaseOrder);
// delete a purchaseOrder 
router.delete('/delete', purchaseOrderController.deletePurchaseOrder);

module.exports = router;