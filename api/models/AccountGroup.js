const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const AccountGroupSchema = mongoose.Schema({
    accountType: {
        type: String,
        required: true,
        unique: true,
    },
    accounts: [{ type: ObjectId, ref: 'Account' }]
});

module.exports = mongoose.model('AccountGroup', AccountGroupSchema);