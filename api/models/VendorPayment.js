const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose');

const VendorPaymentSchema = mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    amount: {
        type: Decimal128,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    },
    vendorPaymentNumber: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    paidThrough: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    bills: [{
        billId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bill"
        },
        amount: {
            type: Decimal128,
            required: true
        }
    }],
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

module.exports = mongoose.model('VendorPayment', VendorPaymentSchema);