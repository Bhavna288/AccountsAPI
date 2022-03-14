const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const VendorDetails = require("../models/VendorDetails");

module.exports = {
    addVendorDetails: async (req, res, next) => {
        try {
            let {
                vendorId,
                gstTreatment,
                sourceOfSupply,
                paymentTerms,
                currency
            } = req.body;
            const new_vendor_details = new VendorDetails({
                vendorId,
                gstTreatment,
                sourceOfSupply,
                paymentTerms,
                currency
            });
            const saved = await new_vendor_details.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Vendor Details"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllVendorDetails: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let vendor_details = [];
            if (limit == "" && page == "")
                vendor_details = await VendorDetails.find({ status: 1 }).skip().limit()
                    .populate("vendorId");
            else
                vendor_details = await VendorDetails.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("vendorId");
            let total_count = await VendorDetails.count({ status: 1 });
            res.status(200)
                .json({ status: 200, data: vendor_details, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getVendorDetailsById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let vendor_details = await VendorDetails.findOne({ _id: id, status: 1 })
                .populate("vendorId");
            if (vendor_details)
                res.status(200)
                    .json({ status: 200, data: vendor_details });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("VendorDetails"), data: vendor_details });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateVendorDetails: async (req, res, next) => {
        try {
            let {
                id,
                vendorId,
                gstTreatment,
                sourceOfSupply,
                paymentTerms,
                currency,
                status
            } = req.body;
            const updated_vendor = await VendorDetails.findOneAndUpdate(
                { _id: id },
                {
                    vendorId,
                    gstTreatment,
                    sourceOfSupply,
                    paymentTerms,
                    currency,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("VendorDetails"), data: updated_vendor });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteVendorDetails: async (req, res, next) => {
        try {
            let { id } = req.body;
            const deleted_vendor_details = await VendorDetails.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("VendorDetails"), data: deleted_vendor_details });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};