const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const PaymentIn = require('../models/PaymentIn');
const jwt = require('jsonwebtoken');

// Gets back all the payment details
router.get('/', async (req, res) => {
    try {
        const payment = await PaymentIn.find()
            .populate("client")
            .populate("sales");
        res.json(payment);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// Gets a specific payment
router.get('/:paymentId', async (req, res) => {
    try {
        const payment = await PaymentIn.findById(req.params.paymentId)
            .populate("client")
            .populate("sales");
        res.json(payment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Gets all payments by a specific client
router.get('/:clientId', async (req, res) => {
    try {
        const payment = await PaymentIn.find({ "client": req.params.clientId })
            .populate("client")
            .populate("sales");
        res.json(payment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Submits or creates a paymentIn
router.post('/', async (req, res) => {

    const payment = new PaymentIn({
        client: req.body.client,
        sale: req.body.sale,
        receiptNo: req.body.receiptNo,
        paymentType: req.body.paymentType,
        description: req.body.description,
        date: req.body.date,
        amount: req.body.amount
    });

    try {
        const savedPayment = await PaymentIn.save()
        // res.json(savedSale);
        res.json({ paymentId: payment._id });
    } catch (err) {
        res.status(400).send(err);
    }

});

// Delete a payment
router.delete('/:paymentId', async (req, res) => {
    try {
        const removedPayment = await PaymentIn.remove({ _id: req.params.paymentId });
        res.json(removedPayment);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update a payment
router.patch('/:paymentId', async (req, res) => {
    try {
        const updatedPayment = await PaymentIn.updateOne(
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