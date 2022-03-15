const { Decimal128, ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const InvoiceSchema = mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    orderNumber: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    dueTerms: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    remarks: String,
    amount: {
        type: Decimal128,
        required: true
    },
    paid: {
        type: Decimal128,
        required: true
    },
    remaining: {
        type: Decimal128,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    itemsInInvoice: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ItemsInOrder"
    }],
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

module.exports = mongoose.model('Invoice', InvoiceSchema);