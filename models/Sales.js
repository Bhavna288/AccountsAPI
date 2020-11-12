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
    quantity: Number,
    unit: String,
    description: String,
    totalPrice: Number
});

module.exports = mongoose.model('Sales', SalesSchema);