const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const Invoice = require("../models/Invoice");

module.exports = {
    addInvoice: async (req, res, next) => {
        try {
            let {
                invoiceNumber,
                orderNumber,
                invoiceDate,
                dueTerms,
                dueDate,
                remarks,
                amount,
                customerId,
                itemsInInvoice,
                paid,
                remaining
            } = req.body;
            const new_invoice = new Invoice({
                invoiceNumber,
                orderNumber,
                invoiceDate,
                dueTerms,
                dueDate,
                remarks,
                amount,
                customerId,
                itemsInInvoice,
                paid,
                remaining
            });
            const saved = await new_invoice.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Invoice"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllInvoice: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let invoices = [];
            if (limit == "" && page == "")
                invoices = await Invoice.find({ status: 1 }).skip().limit()
                    .populate("customerId");
            else
                invoices = await Invoice.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("customerId");
            let total_count = await Invoice.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: invoices, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getInvoiceById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let invoice = await Invoice.findOne({ _id: id, status: 1 })
                .populate("customerId");
            if (invoice)
                res.status(200)
                    .json({ status: 200, data: invoice });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("Invoice"), data: invoice });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateInvoice: async (req, res, next) => {
        try {
            let {
                id,
                invoiceNumber,
                orderNumber,
                invoiceDate,
                dueTerms,
                dueDate,
                remarks,
                amount,
                customerId,
                itemsInInvoice,
                paid,
                remaining,
                status
            } = req.body;
            const updated_invoice = await Invoice.findOneAndUpdate(
                { _id: id },
                {
                    invoiceNumber,
                    orderNumber,
                    invoiceDate,
                    dueTerms,
                    dueDate,
                    remarks,
                    amount,
                    customerId,
                    itemsInInvoice,
                    paid,
                    remaining,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("Invoice"), data: updated_invoice });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteInvoice: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_invoice = await Invoice.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("Invoice"), data: delete_invoice });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};