const mongoose = require('mongoose');

const SalesSchema = mongoose.Schema({
    receiptNo: Number,
    date: {
        type: String,
        default: () => {
            var date = new Date();
            return date.toISOString();
        }
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    // create an items array with quantity, unit, price, total price
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Items"
        },
        quantity: Number,
        unit: String,
        price: Number,
        totalPrice: Number
    }],
    // item: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Items",
    // },
    // quantity: Number,
    // unit: String,
    description: String,
    totalPrice: Number,
    paid: Number,
    remaining: Number
});

module.exports = mongoose.model('Sales', SalesSchema);