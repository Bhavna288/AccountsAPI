const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import routes
const postsRoute = require('./routes/products');

app.use('/posts', postsRoute);

// Routes
app.get('/', (req, res) => {
    res.send("We are on home");
});

// Connect to database
mongoose.connect(process.env.DB_Connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to MongoDB!");
});

// Listening to the server
app.listen(3000);