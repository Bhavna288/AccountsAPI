const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
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
    sale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sales",
    },
    paymentMode: String,
    amount: Number
});

module.exports = mongoose.model('Payment', PaymentSchema);