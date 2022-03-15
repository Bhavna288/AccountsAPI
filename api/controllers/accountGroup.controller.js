const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const AccountGroup = require("../models/AccountGroup");

module.exports = {
    addAccountGroup: async (req, res, next) => {
        try {
            let {
                accountGroupName,
                accountType
            } = req.body;
            const new_account_group = new AccountGroup({
                accountGroupName,
                accountType
            });
            const saved = await new_account_group.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Account Group"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllAccountGroup: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let account_groups = [];
            if (limit == "" && page == "")
                account_groups = await AccountGroup.find({ status: 1 }).skip().limit();
            else
                account_groups = await AccountGroup.find({ status: 1 }).skip(offset).limit(limit);
            let total_count = await AccountGroup.countDocuments({ status: 1 });
            res.status(200)
                .json({ status: 200, data: account_groups, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAccountGroupById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let account_group = await AccountGroup.findOne({ _id: id, status: 1 });
            if (account_group)
                res.status(200)
                    .json({ status: 200, data: account_group });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("Account Group"), data: account_group });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateAccountGroup: async (req, res, next) => {
        try {
            let {
                id,
                accountGroupName,
                accountType,
                status
            } = req.body;
            const update_account_group = await AccountGroup.findOneAndUpdate(
                { _id: id },
                {
                    accountGroupName,
                    accountType,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("Account Group"), data: update_account_group });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteAccountGroup: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_account_group = await AccountGroup.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("Account Group"), data: delete_account_group });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};