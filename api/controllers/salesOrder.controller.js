const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const SalesOrder = require("../models/SalesOrder");

module.exports = {
    addSalesOrder: async (req, res, next) => {
        try {
            let {
                orderDate,
                orderNumber,
                customerId,
                orderStatus,
                invoiced,
                payment,
                delivered,
                amount,
                paymentTerms,
                deliveryMethod,
                remarks
            } = req.body;
            const new_sales_order = new SalesOrder({
                orderDate,
                orderNumber,
                customerId,
                orderStatus,
                invoiced,
                payment,
                delivered,
                amount,
                paymentTerms,
                deliveryMethod,
                remarks
            });
            const saved = await new_sales_order.save();
            res.status(200)
                .json({ status: 200, message: addMessage("SalesOrder"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllSalesOrder: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let sales_orders = [];
            if (limit == "" && page == "")
                sales_orders = await SalesOrder.find({ status: 1 }).skip().limit()
                    .populate("customerId");
            else
                sales_orders = await SalesOrder.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("customerId");
            let total_count = await SalesOrder.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: sales_orders, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getSalesOrderById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let sales_order = await SalesOrder.findOne({ _id: id, status: 1 })
                .populate("customerId");
            if (sales_order)
                res.status(200)
                    .json({ status: 200, data: sales_order });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("SalesOrder"), data: sales_order });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateSalesOrder: async (req, res, next) => {
        try {
            let {
                id,
                orderDate,
                orderNumber,
                customerId,
                orderStatus,
                invoiced,
                payment,
                delivered,
                amount,
                paymentTerms,
                deliveryMethod,
                remarks,
                status
            } = req.body;
            const updated_sales_order = await SalesOrder.findOneAndUpdate(
                { _id: id },
                {
                    orderDate,
                    orderNumber,
                    customerId,
                    orderStatus,
                    invoiced,
                    payment,
                    delivered,
                    amount,
                    paymentTerms,
                    deliveryMethod,
                    remarks,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("SalesOrder"), data: updated_sales_order });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteSalesOrder: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_sales_order = await SalesOrder.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("SalesOrder"), data: delete_sales_order });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};