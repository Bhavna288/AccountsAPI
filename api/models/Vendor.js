const mongoose = require('mongoose');

const VendorSchema = mongoose.Schema({
    vendorName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: String,
    address: {
        type: String,
        required: true
    },
    remarks: String,
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

module.exports = mongoose.model('Vendor', VendorSchema);