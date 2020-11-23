const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const Payment = require('../models/PaymentIn');
const Client = require('../models/Client');
const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

// Gets back all the payment details
router.get('/', async (req, res) => {
    try {
        const payment = await Payment.find()
            .populate("client")
            .populate("sale");
        res.json(payment);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// Gets a specific payment
router.get('/:paymentId', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.paymentId)
            .populate("client")
            .populate("sale");
        res.json(payment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Gets all payments by a specific client
router.get('/client/:clientId', async (req, res) => {
    try {
        const client = await Client.findById(req.params.clientId);

        // console.log(Mongoose.Schema.Types.ObjectId(client._id))
        const payment = await Payment.find({ "client": req.params.clientId })
            .populate("client")
            .populate("sale");

        res.json(payment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Submits or creates a Payment
router.post('/', async (req, res) => {

    const payment = new Payment({
        client: req.body.client,
        sale: req.body.sale,
        receiptNo: req.body.receiptNo,
        paymentType: req.body.paymentType,
        description: req.body.description,
        date: req.body.date,
        amount: req.body.amount
    });

    try {
        const savedPayment = await payment.save()
        // res.json(savedPayment);
        res.json({ paymentId: payment._id });
    } catch (err) {
        res.status(400).send(err);
    }

});

// Delete a payment
router.delete('/:paymentId', async (req, res) => {
    try {
        const removedPayment = await Payment.remove({ _id: req.params.paymentId });
        res.json(removedPayment);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update a payment
router.patch('/:paymentId', async (req, res) => {
    try {
        const updatedPayment = await Payment.updateOne(
            { _id: req.params.paymentId },
            {
                $set: {
                    client: req.body.client,
                    sale: req.body.sale,
                    receiptNo: req.body.receiptNo,
                    paymentType: req.body.paymentType,
                    description: req.body.description,
                    date: req.body.date,
                    amount: req.body.amount
                }
            }
        );
        res.json(updatedPayment);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;