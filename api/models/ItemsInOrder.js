const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose');

const ItemsInOrderSchema = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SalesOrder"
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
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
    discount: {
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

module.exports = mongoose.model('ItemsInOrder', ItemsInOrderSchema);