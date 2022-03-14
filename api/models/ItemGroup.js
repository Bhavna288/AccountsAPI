const mongoose = require('mongoose');

const ItemGroupSchema = mongoose.Schema({
    itemGroupName: {
        type: String,
        required: true,
    },
    description: String,
    unit: {
        type: String,
        required: true
    },
    manufacturer: String,
    brand: String,
    salesAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    purchaseAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    inventoryAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
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

module.exports = mongoose.model('ItemGroup', ItemGroupSchema);