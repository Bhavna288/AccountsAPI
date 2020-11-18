const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const Item = require('../models/Item');
const jwt = require('jsonwebtoken');

// Validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string(),
});

// Gets back all the items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Gets a specific item
router.get('/:itemId', async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        res.json(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Submits or creates a item
router.post('/', async (req, res) => {

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the item is already in the database
    const titleExist = await Item.findOne({ title: req.body.title });
    console.log("titleExist");
    if (titleExist) return res.status(400).send("item already exists.");

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Validate the password
    // const validPass = await bcrypt.compare(req.body.password, titleExist.password);
    // if (!validPass) return res.status(400).send("Incorrect password.");

    const item = new Item({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedItem = await item.save()
        // res.json(savedItem);
        res.json({ itemId: item._id });
    } catch (err) {
        res.status(400).send(err);
    }

});

// Delete an item
router.delete('/:itemId', async (req, res) => {
    try {
        const removedItem = await Item.remove({ _id: req.params.itemId });
        res.json(removedItem);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update an item
router.patch('/:itemId', async (req, res) => {
    try {
        const updatedItem = await Item.updateOne(
            { _id: req.params.itemId },
            { $set: { title: req.body.title, description: req.body.description } }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;