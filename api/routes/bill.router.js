const express = require('express');
const router = express.Router();

const billController = require('../controllers/bill.controller');

// Submits or creates a bill 
router.post('/add', billController.addBill);
// get all data
router.get('/getall', billController.getAllBill);
// get bill  by id
router.post('/getbyid', billController.getBillById);
// updates a bill 
router.put('/update', billController.updateBill);
// delete a bill 
router.delete('/delete', billController.deleteBill);

module.exports = router;