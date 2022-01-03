const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const Sales = require('../models/Sales');
const SalesController = require('../controllers/SalesController');
const jwt = require('jsonwebtoken');

// Gets back all the saless
router.get('/', SalesController.getSales);

// Gets a specific sales
router.get('/:salesId', SalesController.getSalesById);

// Gets all sales to a specific client
router.get('/client/:clientId', SalesController.getSalesByClient);

// Submits or creates a sale
router.post('/', SalesController.createSale);

// Delete a sales
router.delete('/:salesId', SalesController.deleteSale);

// Update a sales
router.patch('/:salesId', SalesController.updateSale);

module.exports = router;