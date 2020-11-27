const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const Sales = require('../models/Sales');
const jwt = require('jsonwebtoken');

// Gets back all the saless
router.get('/', async (req, res) => {
    try {
        const sales = await Sales.find()
            .populate("client")
            .populate("item");
        res.json(sales);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// Gets a specific sales
router.get('/:salesId', async (req, res) => {
    try {
        const sales = await Sales.findById(req.params.salesId)
            .populate("client")
            .populate("item");
        res.json(sales);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Gets all sales to a specific client
router.get('/client/:clientId', async (req, res) => {
    try {
        const sales = await Sales.find({ "client": req.params.clientId })
            .populate("client")
            .populate("item");

        res.json(sales);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Submits or creates a sale
router.post('/', async (req, res) => {

    const sales = new Sales({
        client: req.body.client,
        item: req.body.item,
        quantity: req.body.quantity,
        unit: req.body.unit,
        description: req.body.description,
        totalPrice: req.body.totalPrice,
        date: req.body.date,
        remainingBalance: req.body.remainingBalance
    });

    var date = new Date();
    console.log(date.toString());

    try {
        const savedSale = await sales.save()
        // res.json(savedSale);
        res.json({ salesId: sales._id });
    } catch (err) {
        res.status(400).send(err);
    }

});

// Delete a sales
router.delete('/:salesId', async (req, res) => {
    try {
        const removedSale = await Sales.remove({ _id: req.params.salesId });
        res.json(removedSale);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update a sales
router.patch('/:salesId', async (req, res) => {
    try {
        const updatedSale = await Sales.updateOne(
            { _id: req.params.salesId },
            {
                $set: {
                    client: req.body.client,
                    item: req.body.item,
                    quantity: req.body.quantity,
                    unit: req.body.unit,
                    description: req.body.description,
                    totalPrice: req.body.totalPrice,
                    date: req.body.date,
                    remainingBalance: req.body.remainingBalance
                }
            }
        );
        res.json(updatedSale);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;