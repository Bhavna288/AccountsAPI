const { addMessage, updateMessage, deleteMessage, noRecord } = require("../messages/message");
const Account = require("../models/Account");

module.exports = {
    addAccount: async (req, res, next) => {
        try {
            let {
                accountName,
                accountType
            } = req.body;
            const new_account = new Account({
                accountName,
                accountType
            });
            const saved = await new_account.save();
            res.status(200)
                .json({ status: 200, message: addMessage("Account"), data: saved });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAllAccount: async (req, res, next) => {
        try {
            let { limit, page } = req.body;
            let offset = (page - 1) * limit;
            let accounts = [];
            if (limit == "" && page == "")
                accounts = await Account.find({ status: 1 }).skip().limit()
                    .populate("accountType");
            else
                accounts = await Account.find({ status: 1 }).skip(offset).limit(limit)
                    .populate("accountType");
            let total_count = await Account.count({ status: 1 });
            res.status(200)
                .json({ status: 200, data: accounts, total: total_count });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    getAccountById: async (req, res, next) => {
        try {
            let { id } = req.body;
            let account_group = await Account.findOne({ _id: id, status: 1 })
                .populate("accountType");
            if (account_group)
                res.status(200)
                    .json({ status: 200, data: account_group });
            else
                res.status(200)
                    .json({ status: 200, message: noRecord("Account"), data: account_group });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    updateAccount: async (req, res, next) => {
        try {
            let {
                id,
                accountName,
                accountType,
                status
            } = req.body;
            const updated_account = await Account.findOneAndUpdate(
                { _id: id },
                {
                    accountName,
                    accountType,
                    status,
                    updatedDate: new Date().toISOString()
                }
            );
            res.status(200)
                .json({ status: 200, message: updateMessage("Account"), data: updated_account });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    },
    deleteAccount: async (req, res, next) => {
        try {
            let { id } = req.body;
            const delete_account = await Account.findOneAndUpdate(
                { _id: id },
                { status: 0 }
            );
            res.status(200)
                .json({ status: 200, message: deleteMessage("Account"), data: delete_account });
        } catch (err) {
            if (!err.statusCode) {
                res.status(401)
                    .json({ status: 401, message: err.message, data: {} });
            }
            next(err);
        }
    }
};