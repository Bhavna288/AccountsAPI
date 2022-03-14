const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const AccountGroupSchema = mongoose.Schema({
    accountGroupName: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
        unique: true,
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

module.exports = mongoose.model('AccountGroup', AccountGroupSchema);