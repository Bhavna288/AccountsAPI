const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose');

const ItemsInPurchaseSchema = mongoose.Schema({
    purchaseOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PurchaseOrder"
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    quantity: {
        type: Number,
        required: true
    },
    rate: {
        type: Decimal128,
        required: true
    },
    tax: {
        type: Decimal128,
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

module.exports = mongoose.model('ItemsInPurchase', ItemsInPurchaseSchema);