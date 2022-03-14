const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const accountController = require('../controllers/account.controller');

// Submits or creates an account 
router.post('/add', API.validateKey, accountController.addAccount);
// get all data
router.get('/getall', API.validateKey, accountController.getAllAccount);
// get account  by id
router.post('/getbyid', API.validateKey, accountController.getAccountById);
// updates an account 
router.put('/update', API.validateKey, accountController.updateAccount);
// delete an account 
router.delete('/delete', API.validateKey, accountController.deleteAccount);

module.exports = router;