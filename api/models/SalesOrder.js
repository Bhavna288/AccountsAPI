const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose');

const SalesOrderSchema = mongoose.Schema({
    orderDate: {
        type: Date,
        required: true
    },
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    orderStatus: {
        type: String,
        required: true
    },
    invoiced: Boolean,
    payment: Boolean,
    delivered: Boolean,
    amount: {
        type: Decimal128,
        required: true
    },
    paymentTerms: {
        type: String,
        required: true
    },
    deliveryMethod: {
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

module.exports = mongoose.model('SalesOrder', SalesOrderSchema);