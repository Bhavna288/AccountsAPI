const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

// Gets back all the products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({ message: error });
    }
});

// Gets a specific product
router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.json({ message: error });
    }
});

// Submits or creates a product
router.post('/', async (req, res) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });

    try {
        const savedProduct = await product.save()
        res.json(savedProduct);
    } catch (error) {
        res.json({ message: error });
    }
});

// Delete a product
router.delete('/:productId', async (req, res) => {
    try {
        const removedProduct = await Product.remove({ _id: req.params.productId });
        res.json(removedProduct);
    } catch (error) {
        res.json({ message: error });
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
        res.json({ message: error });
    }
})

module.exports = router;