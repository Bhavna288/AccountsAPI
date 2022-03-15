const mongoose = require('mongoose');

const InventoryStoreSchema = mongoose.Schema({
    createdDate: {
        type: String,
        default: () => {
            var date = new Date();
            return date.toISOString();
        }
    },
    // itemId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Item"
    // },
    inventoryMasterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        unique: true
    },
    stockOnHand: {
        type: Number,
        required: true
    },
    sku: {
        type: String,
        required: true
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

module.exports = mongoose.model('InventoryStore', InventoryStoreSchema);;