const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment.controller');

// Submits or creates a payment 
router.post('/add', paymentController.addPayment);
// get all data
router.get('/getall', paymentController.getAllPayment);
// get payment  by id
router.post('/getbyid', paymentController.getPaymentById);
// updates a payment 
router.put('/update', paymentController.updatePayment);
// delete a payment 
router.delete('/delete', paymentController.deletePayment);

module.exports = router;