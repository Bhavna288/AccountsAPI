const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: String,
        default: () => {
            var date = new Date();
            return date.toISOString();
        }
    }
});

module.exports = mongoose.model('Items', ItemSchema);