const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const Payment = require("../models/Payment");

module.exports = {
    addPayment: async (req, res, next) => {
        try {
            let {
                customerId,
                amount,
                paymentDate,
                paymentNumber,
                mode,
                depositTo,
                invoices,
                remarks
            } = req.body;
            const new_payment = new Payment({
                customerId,
                amount,
                paymentDate,
                paymentNumber,
                mode,
                depositTo,
                invoices,
                remarks
            });
            const saved = await new_payment.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Payment"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllPayment: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let payments = [];
            if (limit == "" && page == "")
                payments = await Payment.find({ status: 1 }).skip().limit()
                    .populate("customerId");
            else
                payments = await Payment.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("customerId");
            let total_count = await Payment.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: payments, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getPaymentById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let payment = await Payment.findOne({ _id: id, status: 1 })
                .populate("customerId");
            if (payment)
                res.status(200)
                    .json({ status: 200, data: payment });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("Payment"), data: payment });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updatePayment: async (req, res, next) => {
        try {
            let {
                id,
                customerId,
                amount,
                paymentDate,
                paymentNumber,
                mode,
                depositTo,
                invoices,
                remarks,
                status
            } = req.body;
            const updated_payment = await Payment.findOneAndUpdate(
                { _id: id },
                {
                    customerId,
                    amount,
                    paymentDate,
                    paymentNumber,
                    mode,
                    depositTo,
                    invoices,
                    remarks,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("Payment"), data: updated_payment });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deletePayment: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_payment = await Payment.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("Payment"), data: delete_payment });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};