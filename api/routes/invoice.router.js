const express = require('express');
const router = express.Router();

const invoiceController = require('../controllers/invoice.controller');

// Submits or creates an invoice 
router.post('/add', invoiceController.addInvoice);
// get all data
router.get('/getall', invoiceController.getAllInvoice);
// get an invoice  by id
router.post('/getbyid', invoiceController.getInvoiceById);
// updates an invoice 
router.put('/update', invoiceController.updateInvoice);
// delete an invoice 
router.delete('/delete', invoiceController.deleteInvoice);

module.exports = router;