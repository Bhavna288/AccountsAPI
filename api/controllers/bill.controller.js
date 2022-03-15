const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const Bill = require("../models/Bill");

module.exports = {
    addBill: async (req, res, next) => {
        try {
            let {
                billNumber,
                vendorId,
                billDate,
                amount,
                dueDate,
                paymentTerms,
                itemsInOrder,
                paid,
                remaining
            } = req.body;
            const new_bill = new Bill({
                billNumber,
                vendorId,
                billDate,
                amount,
                dueDate,
                paymentTerms,
                itemsInOrder,
                paid,
                remaining
            });
            const saved = await new_bill.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Bill"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllBill: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let bills = [];
            if (limit == "" && page == "")
                bills = await Bill.find({ status: 1 }).skip().limit()
                    .populate("customerId");
            else
                bills = await Bill.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("customerId");
            let total_count = await Bill.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: bills, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getBillById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let bill = await Bill.findOne({ _id: id, status: 1 })
                .populate("customerId");
            if (bill)
                res.status(200)
                    .json({ status: 200, data: bill });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("Bill"), data: bill });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateBill: async (req, res, next) => {
        try {
            let {
                id,
                billNumber,
                vendorId,
                billDate,
                amount,
                dueDate,
                paymentTerms,
                itemsInOrder,
                paid,
                remaining,
                status
            } = req.body;
            const updated_bill = await Bill.findOneAndUpdate(
                { _id: id },
                {
                    billNumber,
                    vendorId,
                    billDate,
                    amount,
                    dueDate,
                    paymentTerms,
                    itemsInOrder,
                    paid,
                    remaining,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("Bill"), data: updated_bill });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteBill: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_bill = await Bill.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("Bill"), data: delete_bill });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};