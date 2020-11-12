const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string(),
});

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

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the product is already in the database
    const titleExist = await Product.findOne({ title: req.body.title });
    console.log("titleExist");
    if (titleExist) return res.status(400).send("Product already exists.");

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Validate the password
    // const validPass = await bcrypt.compare(req.body.password, titleExist.password);
    // if (!validPass) return res.status(400).send("Incorrect password.");

    const product = new Product({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedProduct = await product.save()
        // res.json(savedProduct);
        res.json({ productId: product._id });
    } catch (err) {
        res.status(400).send(err);
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