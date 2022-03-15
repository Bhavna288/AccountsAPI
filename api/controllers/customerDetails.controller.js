const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const CustomerDetails = require("../models/CustomerDetails");

module.exports = {
    addCustomerDetails: async (req, res, next) => {
        try {
            let {
                customerId,
                gstTreatment,
                placeOfSupply,
                paymentTerms,
                taxPreference,
                currency
            } = req.body;
            const new_customer_details = new CustomerDetails({
                customerId,
                gstTreatment,
                placeOfSupply,
                paymentTerms,
                taxPreference,
                currency
            });
            const saved = await new_customer_details.save();
            res.status(200)
                .json({ status: 200, message: addMessage("CustomerDetails"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllCustomerDetails: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let customer_details = [];
            if (limit == "" && page == "")
                customer_details = await CustomerDetails.find({ status: 1 }).skip().limit();
            else
                customer_details = await CustomerDetails.find({ status: 1 }).skip(offset).limit(limit);
            let total_count = await CustomerDetails.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: customer_details, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getCustomerDetailsById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let customer_details = await CustomerDetails.findOne({ _id: id, status: 1 });
            if (customer_details)
                res.status(200)
                    .json({ status: 200, data: customer_details });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("CustomerDetails"), data: customer_details });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateCustomerDetails: async (req, res, next) => {
        try {
            let {
                id,
                customerId,
                gstTreatment,
                placeOfSupply,
                paymentTerms,
                taxPreference,
                currency,
                status
            } = req.body;
            const updated_customer_details = await CustomerDetails.findOneAndUpdate(
                { _id: id },
                {
                    customerId,
                    gstTreatment,
                    placeOfSupply,
                    paymentTerms,
                    taxPreference,
                    currency,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("CustomerDetails"), data: updated_customer_details });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteCustomerDetails: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_customer_details = await CustomerDetails.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("CustomerDetails"), data: delete_customer_details });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};