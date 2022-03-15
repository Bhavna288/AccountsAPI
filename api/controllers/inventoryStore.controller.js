const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const InventoryStore = require("../models/InventoryStore");

module.exports = {
    addInventoryStore: async (req, res, next) => {
        try {
            let {
                stockOnHand,
                sku,
                inventoryMasterId
            } = req.body;
            const new_inventory_store = new InventoryStore({
                stockOnHand,
                sku,
                inventoryMasterId
            });
            const saved = await new_inventory_store.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Inventory Master"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllInventoryStore: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let inventory_store = [];
            if (limit == "" && page == "")
                inventory_store = await InventoryStore.find({ status: 1 }).skip().limit()
                    .populate("inventoryMasterId");
            else
                inventory_store = await InventoryStore.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("inventoryMasterId");
            let total_count = await InventoryStore.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: inventory_store, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getInventoryStoreById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let inventory_store = await InventoryStore.findOne({ _id: id, status: 1 })
                .populate("inventoryMasterId");
            if (inventory_store)
                res.status(200)
                    .json({ status: 200, data: inventory_store });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("InventoryStore"), data: inventory_store });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateInventoryStore: async (req, res, next) => {
        try {
            let {
                id,
                stockOnHand,
                sku,
                inventoryMasterId,
                status
            } = req.body;
            const updated_inventory_store = await InventoryStore.findOneAndUpdate(
                { _id: id },
                {
                    stockOnHand,
                    sku,
                    inventoryMasterId,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("InventoryStore"), data: updated_inventory_store });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteInventoryStore: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_inventory_store = await InventoryStore.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("InventoryStore"), data: delete_inventory_store });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};