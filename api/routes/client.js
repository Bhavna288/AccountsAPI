const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const ClientController = require('../controllers/ClientController');
const jwt = require('jsonwebtoken');

// Gets back all the clients
router.get('/', ClientController.getClients);

// Gets a specific client
router.get('/:clientId', API.validateKey, ClientController.getClientById);

// Submits or creates a client
router.post('/', API.validateKey, ClientController.createClient);

// Delete a client
router.delete('/:clientId', API.validateKey, ClientController.deleteClient);

// Update a client
router.patch('/:clientId', API.validateKey, ClientController.updateClient);

module.exports = router;