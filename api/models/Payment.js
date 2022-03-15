const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    amount: {
        type: Decimal128,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    },
    paymentNumber: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    depositTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    invoices: [{
        invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice"
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

module.exports = mongoose.model('Payment', PaymentSchema);