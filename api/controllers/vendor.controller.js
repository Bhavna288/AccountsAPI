const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const Vendor = require("../models/Vendor");

module.exports = {
    addVendor: async (req, res, next) => {
        try {
            let {
                vendorName,
                companyName,
                displayName,
                phone,
                email,
                address,
                remarks
            } = req.body;
            const new_vendor = new Vendor({
                vendorName,
                companyName,
                displayName,
                phone,
                email,
                address,
                remarks
            });
            const saved = await new_vendor.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Vendor"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllVendor: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let vendors = [];
            if (limit == "" && page == "")
                vendors = await Vendor.find({ status: 1 }).skip().limit();
            else
                vendors = await Vendor.find({ status: 1 }).skip(offset).limit(limit);
            let total_count = await Vendor.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: vendors, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getVendorById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let vendor = await Vendor.findOne({ _id: id, status: 1 });
            if (vendor)
                res.status(200)
                    .json({ status: 200, data: vendor });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("Vendor"), data: vendor });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateVendor: async (req, res, next) => {
        try {
            let {
                id,
                vendorName,
                companyName,
                displayName,
                phone,
                email,
                address,
                remarks,
                status
            } = req.body;
            const updated_vendor = await Vendor.findOneAndUpdate(
                { _id: id },
                {
                    vendorName,
                    companyName,
                    displayName,
                    phone,
                    email,
                    address,
                    remarks,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("Vendor"), data: updated_vendor });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteVendor: async (req, res, next) => {
        try {
            let { id } = req.body;
            const deleted_vendor = await Vendor.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("Vendor"), data: deleted_vendor });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};