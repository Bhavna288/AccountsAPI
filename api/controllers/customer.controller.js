const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const Customer = require("../models/Customer");

module.exports = {
    addCustomer: async (req, res, next) => {
        try {
            let {
                customerName,
                customerType,
                companyName,
                displayName,
                phone,
                email,
                website,
                address,
                remarks
            } = req.body;
            const new_customer = new Customer({
                customerName,
                customerType,
                companyName,
                displayName,
                phone,
                email,
                website,
                address,
                remarks
            });
            const saved = await new_customer.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Customer"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllCustomer: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let customers = [];
            if (limit == "" && page == "")
                customers = await Customer.find({ status: 1 }).skip().limit();
            else
                customers = await Customer.find({ status: 1 }).skip(offset).limit(limit);
            let total_count = await Customer.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: customers, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getCustomerById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let customer = await Customer.findOne({ _id: id, status: 1 });
            if (customer)
                res.status(200)
                    .json({ status: 200, data: customer });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("Customer"), data: customer });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateCustomer: async (req, res, next) => {
        try {
            let {
                id,
                customerName,
                customerType,
                companyName,
                displayName,
                phone,
                email,
                website,
                address,
                remarks,
                status
            } = req.body;
            const updated_customer = await Customer.findOneAndUpdate(
                { _id: id },
                {
                    customerName,
                    customerType,
                    companyName,
                    displayName,
                    phone,
                    email,
                    website,
                    address,
                    remarks,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("Customer"), data: updated_customer });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteCustomer: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_customer = await Customer.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("Customer"), data: delete_customer });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};