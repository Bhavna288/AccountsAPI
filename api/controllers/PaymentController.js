const Payment = require('../models/Payment');

module.exports = {
    getPayments: async (req, res) => {
        try {
            const payment = await Payment.find()
                .populate("client")
                .populate("sale");
            res.json(payment);
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    getPaymentById: async (req, res) => {
        try {
            const payment = await Payment.findById(req.params.paymentId)
                .populate("client")
                .populate("sale");
            res.json(payment);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getPaymentsByClient: async (req, res) => {
        try {
            const payment = await Payment.find({ "client": req.params.clientId })
                .populate("client")
                .populate("sale");

            res.json(payment);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getPaymentsBySale: async (req, res) => {
        try {
            const payment = await Payment.find({ "sale": req.params.saleId })
                .populate("client")
                .populate("sale");

            res.json(payment);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    createPayment: async (req, res) => {
        const payment = new Payment({
            sale: req.body.sale,
            client: req.body.client,
            paymentMode: req.body.paymentMode,
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

    },
    deletePayment: async (req, res) => {
        try {
            const removedPayment = await Payment.remove({ _id: req.params.paymentId });
            res.json(removedPayment);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    updatePayment: async (req, res) => {
        try {
            const updatedPayment = await Payment.updateOne(
                { _id: req.params.paymentId },
                {
                    $set: {
                        paymentMode: req.body.paymentMode,
                        client: req.body.client,
                        date: req.body.date,
                        amount: req.body.amount
                    }
                }
            );
            res.json(updatedPayment);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};