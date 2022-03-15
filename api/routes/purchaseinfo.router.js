const express = require('express');
const router = express.Router();

const purchaseInfoController = require('../controllers/purchaseInfo.controller');

// Submits or creates a purchaseInfo 
router.post('/add', purchaseInfoController.addPurchaseInfo);
// get all data
router.get('/getall', purchaseInfoController.getAllPurchaseInfo);
// get purchaseInfo  by id
router.post('/getbyid', purchaseInfoController.getPurchaseInfoById);
// updates a purchaseInfo 
router.put('/update', purchaseInfoController.updatePurchaseInfo);
// delete a purchaseInfo 
router.delete('/delete', purchaseInfoController.deletePurchaseInfo);

module.exports = router;