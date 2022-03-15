const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const PurchaseInfo = require("../models/PurchaseInfo");

module.exports = {
    addPurchaseInfo: async (req, res, next) => {
        try {
            let {
                itemId,
                costPrice,
                accountId,
                description
            } = req.body;
            const new_purchase_info = new PurchaseInfo({
                itemId,
                costPrice,
                accountId,
                description
            });
            const saved = await new_purchase_info.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Purchase Info"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllPurchaseInfo: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let purchase_info = [];
            if (limit == "" && page == "")
                purchase_info = await PurchaseInfo.find({ status: 1 }).skip().limit()
                    .populate("itemId")
                    .populate("accountId");
            else
                purchase_info = await PurchaseInfo.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("itemId")
                    .populate("accountId");

            let total_count = await PurchaseInfo.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: purchase_info, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getPurchaseInfoById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let purchase_info = await PurchaseInfo.findOne({ _id: id, status: 1 })
                .populate("itemId")
                .populate("accountId");
            if (purchase_info)
                res.status(200)
                    .json({ status: 200, data: purchase_info });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("Purchase Info"), data: purchase_info });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updatePurchaseInfo: async (req, res, next) => {
        try {
            let {
                id,
                itemId,
                costPrice,
                accountId,
                description,
                status
            } = req.body;
            const updated_purchase_info = await PurchaseInfo.findOneAndUpdate(
                { _id: id },
                {
                    itemId,
                    costPrice,
                    accountId,
                    description,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("Purchase Info"), data: updated_purchase_info });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deletePurchaseInfo: async (req, res, next) => {
        try {
            let { id } = req.body;
            const deleted_purchase_info = await PurchaseInfo.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("Purchase Info"), data: deleted_purchase_info });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};