const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const ItemsInPurchase = require("../models/ItemsInPurchase");

module.exports = {
    addItemsInPurchase: async (req, res, next) => {
        try {
            let {
                purchaseOrderId,
                quantity,
                accountId,
                rate,
                tax,
                amount,
                paid,
                remaining
            } = req.body;
            const new_items_in_purchase = new ItemsInPurchase({
                purchaseOrderId,
                quantity,
                accountId,
                rate,
                tax,
                amount,
                paid,
                remaining
            });
            const saved = await new_items_in_purchase.save();
            res.status(200)
                .json({ status: 200, message: addMessage("ItemsInPurchase"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllItemsInPurchase: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let items_in_purchase = [];
            if (limit == "" && page == "")
                items_in_purchase = await ItemsInPurchase.find({ status: 1 }).skip().limit()
                    .populate("purchaseOrderId");
            else
                items_in_purchase = await ItemsInPurchase.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("purchaseOrderId");
            let total_count = await ItemsInPurchase.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: items_in_purchase, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getItemsInPurchaseById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let items_in_purchase = await ItemsInPurchase.findOne({ _id: id, status: 1 })
                .populate("purchaseOrderId");
            if (items_in_purchase)
                res.status(200)
                    .json({ status: 200, data: items_in_purchase });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("ItemsInPurchase"), data: items_in_purchase });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateItemsInPurchase: async (req, res, next) => {
        try {
            let {
                id,
                purchaseOrderId,
                quantity,
                accountId,
                rate,
                tax,
                amount,
                paid,
                remaining,
                status
            } = req.body;
            const updated_items_in_purchase = await ItemsInPurchase.findOneAndUpdate(
                { _id: id },
                {
                    purchaseOrderId,
                    quantity,
                    accountId,
                    rate,
                    tax,
                    amount,
                    paid,
                    remaining,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("ItemsInPurchase"), data: updated_items_in_purchase });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteItemsInPurchase: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_items_in_purchase = await ItemsInPurchase.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("ItemsInPurchase"), data: delete_items_in_purchase });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};