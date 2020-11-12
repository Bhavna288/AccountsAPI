const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

// Validation
const Joi = require('@hapi/joi');

const schema = {
    title: Joi.string().min(3).required(),
    description: Joi.string(),
    price: Joi.number().required().greater(0)
}

// Gets back all the products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Gets a specific product
router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Submits or creates a product
router.post('/', async (req, res) => {

    const { error } = Joi.validate(req.body, schema);

    if (error) {
        res.status(400).send(error.details[0].message);
    } else {
        const product = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        });

        try {
            const savedProduct = await product.save()
            res.json(savedProduct);
        } catch (err) {
            res.status(400).send(err);
        }
    }
});

// Delete a product
router.delete('/:productId', async (req, res) => {
    try {
        const removedProduct = await Product.remove({ _id: req.params.productId });
        res.json(removedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update a product
router.patch('/:productId', async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne(
            { _id: req.params.productId },
            { $set: { title: req.body.title, description: req.body.description } }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;