const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const port = process.env.PORT || 1337;

const app = express();

// Import routes
const itemsRoute = require('./routes/items');
const salesRoute = require('./routes/sales');
const clientsRoute = require('./routes/client');
const paymentRoute = require('./routes/payment');

// Github Repository: https://github.com/Bhavna288/AccountsAPI.git
// Kudu Repository for continuous deployment on azure: https://divyatradersaccounts.scm.azurewebsites.net:443/divyatradersaccounts.git

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Middlewares
app.use('/items', itemsRoute);
app.use('/sales', salesRoute);
app.use('/clients', clientsRoute);
app.use('/payments', paymentRoute);

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