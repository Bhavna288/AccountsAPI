const mongoose = require('mongoose');

const SalesSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
    },
    description: String,
    quantity: Number,
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Units"
    },
    totalPrice: Number
});

module.exports = mongoose.model('Sales', SalesSchema);