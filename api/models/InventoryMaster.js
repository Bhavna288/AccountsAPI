const { Decimal128 } = require('mongoose');
const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    createdDate: {
        type: String,
        default: () => {
            var date = new Date();
            return date.toISOString();
        }
    },
    inventoryAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    openingStock: {
        type: Number,
        required: true
    },
    openingStockRatePerUnit: {
        type: Decimal128,
        required: true
    },
    reorderPoint: String,
    remarks: String,
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
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

module.exports = mongoose.model('Inventory', InventorySchema);