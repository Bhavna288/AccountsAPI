const mongoose = require('mongoose');

const SalesSchema = mongoose.Schema({
    date: {
        type: String,
        default: () => {
            var date = new Date();
            return date.toString();
        }
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
    },
    quantity: Number,
    unit: String,
    description: String,
    totalPrice: Number
});

module.exports = mongoose.model('Sales', SalesSchema);