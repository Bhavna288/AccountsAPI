const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const ItemsInOrder = require("../models/ItemsInOrder");

module.exports = {
    addItemsInOrder: async (req, res, next) => {
        try {
            let {
                orderId,
                itemId,
                quantity,
                rate,
                tax,
                discount,
                amount,
                paid,
                remaining
            } = req.body;
            const new_items_in_order = new ItemsInOrder({
                orderId,
                itemId,
                quantity,
                rate,
                tax,
                discount,
                amount,
                paid,
                remaining
            });
            const saved = await new_items_in_order.save();
            res.status(200)
                .json({ status: 200, message: addMessage("ItemsInOrder"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllItemsInOrder: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let items_in_order = [];
            if (limit == "" && page == "")
                items_in_order = await ItemsInOrder.find({ status: 1 }).skip().limit()
                    .populate("itemId");
            else
                items_in_order = await ItemsInOrder.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("itemId");
            let total_count = await ItemsInOrder.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: items_in_order, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getItemsInOrderById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let items_in_order = await ItemsInOrder.findOne({ _id: id, status: 1 })
                .populate("itemId");
            if (items_in_order)
                res.status(200)
                    .json({ status: 200, data: items_in_order });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("ItemsInOrder"), data: items_in_order });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateItemsInOrder: async (req, res, next) => {
        try {
            let {
                id,
                orderId,
                itemId,
                quantity,
                rate,
                tax,
                discount,
                amount,
                paid,
                remaining,
                status
            } = req.body;
            const updated_items_in_order = await ItemsInOrder.findOneAndUpdate(
                { _id: id },
                {
                    orderId,
                    itemId,
                    quantity,
                    rate,
                    tax,
                    discount,
                    amount,
                    paid,
                    remaining,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("ItemsInOrder"), data: updated_items_in_order });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteItemsInOrder: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_items_in_order = await ItemsInOrder.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("ItemsInOrder"), data: delete_items_in_order });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};