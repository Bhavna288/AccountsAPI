const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const ItemGroup = require("../models/ItemGroup");

module.exports = {
    addItemGroup: async (req, res, next) => {
        try {
            let {
                itemGroupName,
                description,
                unit,
                manufacturer,
                brand,
                salesAccount,
                purchaseAccount,
                inventoryAccount
            } = req.body;

            const new_item_group = new ItemGroup({
                itemGroupName,
                description,
                unit,
                manufacturer,
                brand,
                salesAccount,
                purchaseAccount,
                inventoryAccount
            });
            const saved = await new_item_group.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Item Group"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllItemGroup: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let item_groups = [];
            if (limit == "" && page == "")
                item_groups = await ItemGroup.find({ status: 1 }).skip().limit();
            else
                item_groups = await ItemGroup.find({ status: 1 }).skip(offset).limit(limit);
            let total_count = await ItemGroup.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: item_groups, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getItemGroupById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let item_group = await ItemGroup.findOne({ _id: id, status: 1 });
            if (item_group)
                res.status(200)
                    .json({ status: 200, data: item_group });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("Item Group"), data: item_group });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateItemGroup: async (req, res, next) => {
        try {
            let {
                id,
                itemGroupName,
                description,
                unit,
                manufacturer,
                brand,
                salesAccount,
                purchaseAccount,
                inventoryAccount,
                status
            } = req.body;
            const update_item_group = await ItemGroup.findOneAndUpdate(
                { _id: id },
                {
                    itemGroupName,
                    description,
                    unit,
                    manufacturer,
                    brand,
                    salesAccount,
                    purchaseAccount,
                    inventoryAccount,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("Item Group"), data: update_item_group });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteItemGroup: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_item_group = await ItemGroup.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("Item Group"), data: delete_item_group });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};