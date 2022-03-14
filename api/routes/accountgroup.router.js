const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const accountGroupController = require('../controllers/accountGroup.controller');

// Submits or creates an account group
router.post('/add', API.validateKey, accountGroupController.addAccountGroup);
// get all data
router.get('/getall', API.validateKey, accountGroupController.getAllAccountGroup);
// get account group by id
router.post('/getbyid', API.validateKey, accountGroupController.getAccountGroupById);
// updates an account group
router.put('/update', API.validateKey, accountGroupController.updateAccountGroup);
// delete an account group
router.delete('/delete', API.validateKey, accountGroupController.deleteAccountGroup);

module.exports = router;