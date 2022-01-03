const Item = require('../models/Item');

// Validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string(),
});

module.exports = {
    getItems: async (req, res) => {
        try {
            const items = await Item.find();
            res.json(items);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getItemById: async (req, res) => {
        try {
            const item = await Item.findById(req.params.itemId);
            res.json(item);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    createItem: async (req, res) => {

        const { error } = schema.validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const titleExist = await Item.findOne({ title: req.body.title });
        console.log("titleExist");
        if (titleExist) return res.status(400).send("item already exists.");
        const item = new Item({
            title: req.body.title,
            description: req.body.description
        });

        try {
            const savedItem = await item.save()
            // res.json(savedItem);
            res.json({ itemId: item._id });
        } catch (err) {
            res.status(400).send(err);
        }
    },
    deleteItem: async (req, res) => {
        try {
            const removedItem = await Item.remove({ _id: req.params.itemId });
            res.json(removedItem);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    updateItem: async (req, res) => {
        try {
            const updatedItem = await Item.updateOne(
                { _id: req.params.itemId },
                { $set: { title: req.body.title, description: req.body.description } }
            );
            res.json(updatedItem);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};