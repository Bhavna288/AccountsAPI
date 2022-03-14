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
    stockKeepingUnit: String,
    unit: String,
    description: String,
    date: {
        type: String,
        default: () => {
            var date = new Date();
            return date.toISOString();
        }
    },
    itemType: String,
    taxPreference: String,
    manufacturer: String,
    brand: String,
    inventoryType: String,
    currentRate: Number
});

module.exports = mongoose.model('Items', ItemMasterSchema);