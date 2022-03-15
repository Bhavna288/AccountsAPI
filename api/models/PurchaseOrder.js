const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose');

const PurchaseOrderSchema = mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    deliverTo: {
        type: String,
        required: true
    },
    purchaseOrderNumber: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    expectedDeliveryDate: {
        type: Date,
        required: true
    },
    paymentTerms: {
        type: String,
        required: true
    },
    remarks: String,
    amount: {
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

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);