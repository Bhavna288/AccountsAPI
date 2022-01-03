const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const ClientController = require('../controllers/ClientController');
const jwt = require('jsonwebtoken');

// Gets back all the clients
router.get('/', ClientController.getClients);

// Gets a specific client
router.get('/:clientId', ClientController.getClientById);

// Submits or creates a client
router.post('/', ClientController.createClient);

// Delete a client
router.delete('/:clientId', ClientController.deleteClient);

// Update a client
router.patch('/:clientId', ClientController.updateClient);

module.exports = router;