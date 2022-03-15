const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const Item = require("../models/Item");

module.exports = {
    addItem: async (req, res, next) => {
        try {
            let {
                itemName,
                itemGroupId,
                stockKeepingUnit,
                unit,
                description,
                itemType,
                taxPreference,
                manufacturer,
                brand,
                inventoryType,
                currentRate,
                itemPrice
            } = req.body;

            const new_item = new Item({
                itemName,
                itemGroupId,
                stockKeepingUnit,
                unit,
                description,
                itemType,
                taxPreference,
                manufacturer,
                brand,
                inventoryType,
                currentRate,
                itemPrice
            });
            const saved = await new_item.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Item"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllItem: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let items = [];
            if (limit == "" && page == "")
                items = await Item.find({ status: 1 }).skip().limit()
                    .populate("itemGroupId");
            else
                items = await Item.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("itemGroupId");
            let total_count = await Item.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: items, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getItemById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let item = await Item.findOne({ _id: id, status: 1 })
                .populate("itemGroupId");
            if (item)
                res.status(200)
                    .json({ status: 200, data: item });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("Item"), data: item });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateItem: async (req, res, next) => {
        try {
            let {
                id,
                itemName,
                itemGroupId,
                stockKeepingUnit,
                unit,
                description,
                itemType,
                taxPreference,
                manufacturer,
                brand,
                inventoryType,
                currentRate,
                itemPrice,
                status
            } = req.body;
            const update_item = await Item.findOneAndUpdate(
                { _id: id },
                {
                    itemName,
                    itemGroupId,
                    stockKeepingUnit,
                    unit,
                    description,
                    itemType,
                    taxPreference,
                    manufacturer,
                    brand,
                    inventoryType,
                    currentRate,
                    itemPrice,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("Item"), data: update_item });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteItem: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_item = await Item.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("Item"), data: delete_item });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};