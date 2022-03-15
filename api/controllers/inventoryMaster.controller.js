const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const InventoryMaster = require("../models/InventoryMaster");

module.exports = {
    addInventoryMaster: async (req, res, next) => {
        try {
            let {
                inventoryAccountId,
                itemId,
                openingStock,
                openingStockRatePerUnit,
                reorderPoint,
                vendorId,
                remarks
            } = req.body;
            const new_inventory = new InventoryMaster({
                inventoryAccountId,
                itemId,
                openingStock,
                openingStockRatePerUnit,
                reorderPoint,
                vendorId,
                remarks
            });
            const saved = await new_inventory.save();
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
    getAllInventoryMaster: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let inventory_master = [];
            if (limit == "" && page == "")
                inventory_master = await InventoryMaster.find({ status: 1 }).skip().limit()
                    .populate("itemId")
                    .populate("vendorId")
                    .populate("inventoryAccountId");
            else
                inventory_master = await InventoryMaster.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("itemId")
                    .populate("vendorId")
                    .populate("inventoryAccountId");
            let total_count = await InventoryMaster.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: inventory_master, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getInventoryMasterById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let inventory_master = await InventoryMaster.findOne({ _id: id, status: 1 })
                .populate("itemId")
                .populate("vendorId")
                .populate("inventoryAccountId");
            if (inventory_master)
                res.status(200)
                    .json({ status: 200, data: inventory_master });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("InventoryMaster"), data: inventory_master });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateInventoryMaster: async (req, res, next) => {
        try {
            let {
                id,
                inventoryAccountId,
                itemId,
                openingStock,
                openingStockRatePerUnit,
                reorderPoint,
                vendorId,
                remarks,
                status
            } = req.body;
            const updated_inventory = await InventoryMaster.findOneAndUpdate(
                { _id: id },
                {
                    inventoryAccountId,
                    itemId,
                    openingStock,
                    openingStockRatePerUnit,
                    reorderPoint,
                    vendorId,
                    remarks,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("InventoryMaster"), data: updated_inventory });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteInventoryMaster: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_inventory = await InventoryMaster.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("InventoryMaster"), data: delete_inventory });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};