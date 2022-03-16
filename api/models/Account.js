const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    accountName: {
        type: String,
        required: true,
    },
    accountType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AccountGroup'
    },
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

module.exports = mongoose.model('Account', AccountSchema);