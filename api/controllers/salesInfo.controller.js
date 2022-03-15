const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const SalesInfo = require("../models/SalesInfo");

module.exports = {
    addSalesInfo: async (req, res, next) => {
        try {
            let {
                itemId,
                sellingPrice,
                accountId,
                description
            } = req.body;
            const new_sales_info = new SalesInfo({
                itemId,
                sellingPrice,
                accountId,
                description
            });
            const saved = await new_sales_info.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Sales Info"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllSalesInfo: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let sales_info = [];
            if (limit == "" && page == "")
                sales_info = await SalesInfo.find({ status: 1 }).skip().limit()
                    .populate("itemId")
                    .populate("accountId");
            else
                sales_info = await SalesInfo.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("itemId")
                    .populate("accountId");

            let total_count = await SalesInfo.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: sales_info, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getSalesInfoById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let sales_info = await SalesInfo.findOne({ _id: id, status: 1 })
                .populate("itemId")
                .populate("accountId");
            if (sales_info)
                res.status(200)
                    .json({ status: 200, data: sales_info });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("SalesInfo"), data: sales_info });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateSalesInfo: async (req, res, next) => {
        try {
            let {
                id,
                itemId,
                sellingPrice,
                accountId,
                description,
                status
            } = req.body;
            const updated_sales_info = await SalesInfo.findOneAndUpdate(
                { _id: id },
                {
                    itemId,
                    sellingPrice,
                    accountId,
                    description,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("SalesInfo"), data: updated_sales_info });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteSalesInfo: async (req, res, next) => {
        try {
            let { id } = req.body;
            const deleted_sales_info = await SalesInfo.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("SalesInfo"), data: deleted_sales_info });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};