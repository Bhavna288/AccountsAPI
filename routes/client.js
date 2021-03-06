const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const Client = require('../models/Client');
const jwt = require('jsonwebtoken');

// Gets back all the clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Gets a specific client
router.get('/:clientId', async (req, res) => {
    try {
        const client = await Client.findById(req.params.clientId);
        res.json(client);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Submits or creates a client
router.post('/', async (req, res) => {

    // // Checking if the client is already in the database
    // const nameExist = await client.findOne({ name: req.body.title });
    // if (nameExist) return res.status(400).send("Client already exists.");

    const client = new Client({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const savedClient = await client.save()
        // res.json(savedClient);
        res.json({ clientId: client._id });
    } catch (err) {
        res.status(400).send(err);
    }

});

// Delete a client
router.delete('/:clientId', async (req, res) => {
    try {
        const removedClient = await Client.remove({ _id: req.params.clientId });
        res.json(removedClient);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update a client
router.patch('/:clientId', async (req, res) => {
    try {
        const updatedClient = await Client.updateOne(
            { _id: req.params.clientId },
            { $set: { name: req.body.name, description: req.body.description } }
        );
        res.json(updatedClient);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;