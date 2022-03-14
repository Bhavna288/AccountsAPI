const mongoose = require('mongoose');

const PurchaseInfoSchema = mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    costPrice: {
        type: Number,
        required: true
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    description: String,
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

module.exports = mongoose.model('PurchaseInfo', PurchaseInfoSchema);