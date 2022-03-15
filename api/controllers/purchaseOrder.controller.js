const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const PurchaseOrder = require("../models/PurchaseOrder");

module.exports = {
    addPurchaseOrder: async (req, res, next) => {
        try {
            let {
                vendorId,
                deliverTo,
                purchaseOrderNumber,
                orderDate,
                expectedDeliveryDate,
                paymentTerms,
                remarks,
                amount
            } = req.body;
            const new_purchase_order = new PurchaseOrder({
                vendorId,
                deliverTo,
                purchaseOrderNumber,
                orderDate,
                expectedDeliveryDate,
                paymentTerms,
                remarks,
                amount
            });
            const saved = await new_purchase_order.save();
            res.status(200)
                .json({ status: 200, message: addMessage("PurchaseOrder"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllPurchaseOrder: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let purchase_orders = [];
            if (limit == "" && page == "")
                purchase_orders = await PurchaseOrder.find({ status: 1 }).skip().limit()
                    .populate("customerId");
            else
                purchase_orders = await PurchaseOrder.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("customerId");
            let total_count = await PurchaseOrder.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: purchase_orders, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getPurchaseOrderById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let purchase_order = await PurchaseOrder.findOne({ _id: id, status: 1 })
                .populate("customerId");
            if (purchase_order)
                res.status(200)
                    .json({ status: 200, data: purchase_order });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("PurchaseOrder"), data: purchase_order });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updatePurchaseOrder: async (req, res, next) => {
        try {
            let {
                id,
                vendorId,
                deliverTo,
                purchaseOrderNumber,
                orderDate,
                expectedDeliveryDate,
                paymentTerms,
                remarks,
                amount,
                status
            } = req.body;
            const updated_purchase_order = await PurchaseOrder.findOneAndUpdate(
                { _id: id },
                {
                    vendorId,
                    deliverTo,
                    purchaseOrderNumber,
                    orderDate,
                    expectedDeliveryDate,
                    paymentTerms,
                    remarks,
                    amount,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("PurchaseOrder"), data: updated_purchase_order });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deletePurchaseOrder: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_purchase_order = await PurchaseOrder.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("PurchaseOrder"), data: delete_purchase_order });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};