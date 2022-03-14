const mongoose = require('mongoose');

const VendorDetailsSchema = mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    gstTreatment: {
        type: String,
        required: true
    },
    sourceOfSupply: {
        type: String,
        required: true
    },
    paymentTerms: {
        type: String,
        required: true
    },
    currency: String,
    createdDate: {
        type: String,
        default: () => {
            var date = new Date();
            return date.toISOString();
        }
    },
    updatedDate: {
        type: String,
        default: () => {
            var date = new Date();
            return date.toISOString();
        }
    },
    status: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('VendorDetails', VendorDetailsSchema);