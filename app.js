const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const port = process.env.PORT || 1337;

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import routes
const productsRoute = require('./routes/products');

app.use('/products', productsRoute);

// Routes
app.get('/', (req, res) => {
    res.send("We are on home page");
});

// Connect to database
mongoose.connect(process.env.DB_Connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to MongoDB!");
});

// Listening to the server
app.listen(port, () => {
    console.log("Server listening on port", port);
});