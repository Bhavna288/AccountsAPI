const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account.controller');

// Submits or creates an account 
router.post('/add', accountController.addAccount);
// get all data
router.get('/getall', accountController.getAllAccount);
// get account  by id
router.post('/getbyid', accountController.getAccountById);
// updates an account 
router.put('/update', accountController.updateAccount);
// delete an account 
router.delete('/delete', accountController.deleteAccount);

module.exports = router;