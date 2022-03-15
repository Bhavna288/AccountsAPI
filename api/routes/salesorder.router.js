const express = require('express');
const router = express.Router();

const salesOrderController = require('../controllers/salesOrder.controller');

// Submits or creates a salesOrder 
router.post('/add', salesOrderController.addSalesOrder);
// get all data
router.get('/getall', salesOrderController.getAllSalesOrder);
// get salesOrder  by id
router.post('/getbyid', salesOrderController.getSalesOrderById);
// updates a salesOrder 
router.put('/update', salesOrderController.updateSalesOrder);
// delete a salesOrder 
router.delete('/delete', salesOrderController.deleteSalesOrder);

module.exports = router;