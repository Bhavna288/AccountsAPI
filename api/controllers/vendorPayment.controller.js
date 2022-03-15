const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const VendorPayment = require("../models/VendorPayment");

module.exports = {
    addVendorPayment: async (req, res, next) => {
        try {
            let {
                vendorId,
                amount,
                paymentDate,
                vendorPaymentNumber,
                mode,
                paidThrough,
                bills,
                remarks
            } = req.body;
            const new_vendor_payment = new VendorPayment({
                vendorId,
                amount,
                paymentDate,
                vendorPaymentNumber,
                mode,
                paidThrough,
                bills,
                remarks
            });
            const saved = await new_vendor_payment.save();
            res.status(200)
                .json({ status: 200, message: addMessage("VendorPayment"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllVendorPayment: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let vendor_payments = [];
            if (limit == "" && page == "")
                vendor_payments = await VendorPayment.find({ status: 1 }).skip().limit()
                    .populate("vendorId");
            else
                vendor_payments = await VendorPayment.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("vendorId");
            let total_count = await VendorPayment.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: vendor_payments, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getVendorPaymentById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let vendor_payment = await VendorPayment.findOne({ _id: id, status: 1 })
                .populate("vendorId");
            if (vendor_payment)
                res.status(200)
                    .json({ status: 200, data: vendor_payment });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("VendorPayment"), data: vendor_payment });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateVendorPayment: async (req, res, next) => {
        try {
            let {
                id,
                vendorId,
                amount,
                paymentDate,
                vendorPaymentNumber,
                mode,
                paidThrough,
                bills,
                remarks,
                status
            } = req.body;
            const updated_vendor_payment = await VendorPayment.findOneAndUpdate(
                { _id: id },
                {
                    vendorId,
                    amount,
                    paymentDate,
                    vendorPaymentNumber,
                    mode,
                    paidThrough,
                    bills,
                    remarks,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("VendorPayment"), data: updated_vendor_payment });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteVendorPayment: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_vendor_payment = await VendorPayment.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("VendorPayment"), data: delete_vendor_payment });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};