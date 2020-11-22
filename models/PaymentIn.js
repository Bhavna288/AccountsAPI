const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
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
        ref: "Client",
    },
    sale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sales",
    },
    paymentType: String,
    amount: Number,
    description: String
});

module.exports = mongoose.model('PaymentIn', PaymentSchema);