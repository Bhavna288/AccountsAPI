const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const PaymentController = require('../controllers/PaymentController');
const jwt = require('jsonwebtoken');

// Gets back all the payment details
router.get('/', PaymentController.getPayments);

// Gets a specific payment
router.get('/:paymentId', PaymentController.getPaymentById);

// Gets all payments by a specific client
router.get('/client/:clientId', PaymentController.getPaymentsByClient);

// Gets all payments of one salee
router.get('/sale/:saleId', PaymentController.getPaymentsBySale);

// Submits or creates a Payment
router.post('/', PaymentController.createPayment);

// Delete a payment
router.delete('/:paymentId', PaymentController.deletePayment);

// Update a payment
router.patch('/:paymentId', PaymentController.updatePayment);

module.exports = router;