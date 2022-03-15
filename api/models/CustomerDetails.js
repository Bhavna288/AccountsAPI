const mongoose = require('mongoose');

const CustomerDetailsSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        unique: true
    },
    gstTreatment: {
        type: String,
        required: true
    },
    placeOfSupply: {
        type: String,
        required: true
    },
    paymentTerms: {
        type: String,
        required: true
    },
    taxPreference: {
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

module.exports = mongoose.model('CustomerDetails', CustomerDetailsSchema);