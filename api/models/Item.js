const mongoose = require('mongoose');

const ItemMasterSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ItemGroup"
    },
    stockKeepingUnit: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    description: String,
    itemType: {
        type: String,
        required: true
    },
    taxPreference: {
        type: String,
        required: true
    },
    manufacturer: String,
    brand: String,
    inventoryType: {
        type: String,
        required: true
    },
    currentRate: {
        type: Number,
        required: true
    },
    itemPrice: [{
        price: Number,
        updatedDate: Date
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

module.exports = mongoose.model('Item', ItemMasterSchema);