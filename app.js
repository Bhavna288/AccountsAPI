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
const postsRoute = require('./routes/products');

app.use('/posts', postsRoute);

// Routes
app.get('/', (req, res) => {
    res.send("We are on home");
});

// Connect to database
mongoose.connect("mongodb+srv://bhavnatahelyani:bhavna288@learning-node.36qjc.azure.mongodb.net/divya-traders-account?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to MongoDB!");
});

// Listening to the server
app.listen(port, () => {
    console.log("Server listening on port", port);
});