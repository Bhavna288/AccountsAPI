const express = require('express');
const router = express.Router();

const itemGroupController = require('../controllers/itemGroup.controller');

// Submits or creates an item group
router.post('/add', itemGroupController.addItemGroup);
// get all data
router.get('/getall', itemGroupController.getAllItemGroup);
// get item group by id
router.post('/getbyid', itemGroupController.getItemGroupById);
// updates an item group
router.put('/update', itemGroupController.updateItemGroup);
// delete an item group
router.delete('/delete', itemGroupController.deleteItemGroup);

module.exports = router;