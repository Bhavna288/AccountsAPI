const mongoose = require('mongoose');

const ItemGroupSchema = mongoose.Schema({
    itemGroupName: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    unit: String,
    manufacturer: String,
    brand: String,
    salesAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    purchaseAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    inventoryAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }
});

module.exports = mongoose.model('ItemGroup', ItemGroupSchema);