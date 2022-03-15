const express = require('express');
const router = express.Router();
const API = require('./../middleware/apikey');
// const bcrypt = require('bcryptjs');
const accountGroupController = require('../controllers/accountGroup.controller');

// Submits or creates an account group
router.post('/add', accountGroupController.addAccountGroup);
// get all data
router.get('/getall', accountGroupController.getAllAccountGroup);
// get account group by id
router.post('/getbyid', accountGroupController.getAccountGroupById);
// updates an account group
router.put('/update', accountGroupController.updateAccountGroup);
// delete an account group
router.delete('/delete', accountGroupController.deleteAccountGroup);

module.exports = router;