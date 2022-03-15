const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    billDate: {
        type: Date,
        required: true
    },
    billNumber: {
        type: String,
        required: true,
        unique: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    dueDate: {
        type: Date,
        required: true
    },
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
    paymentTerms: {
        type: String,
        required: true
    },
    itemsInOrder: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ItemsInPurchase"
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

module.exports = mongoose.model('Bill', BillSchema);