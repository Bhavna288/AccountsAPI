const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const ItemController = require('../controllers/ItemController');
const jwt = require('jsonwebtoken');

// Gets back all the items
router.get('/', ItemController.getItems);

// Gets a specific item
router.get('/:itemId', ItemController.getItemById);

// Submits or creates a item
router.post('/', ItemController.createItem);

// Delete an item
router.delete('/:itemId', ItemController.deleteItem);

// Update an item
router.patch('/:itemId', ItemController.updateItem);

module.exports = router;