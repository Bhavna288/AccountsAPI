require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 1337;

const app = express();

// Import routes
const accountGroupRoutes = require('./api/routes/accountgroup.router');
const accountRoutes = require('./api/routes/account.router');
const itemGroupRoutes = require('./api/routes/itemgroup.router');
const itemRoutes = require('./api/routes/item.router');
const vendorRoutes = require('./api/routes/vendor.router');
const vendorDetailsRoutes = require('./api/routes/vendordetails.router');
const salesInfoRoutes = require('./api/routes/salesinfo.router');
const purchaseInfoRoutes = require('./api/routes/purchaseinfo.router');

// Github Repository: https://github.com/Bhavna288/AccountsAPI.git
// Kudu Repository for continuous deployment on azure: https://divyatradersaccounts.scm.azurewebsites.net:443/divyatradersaccounts.git

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Middlewares
app.use('/accountgroup', accountGroupRoutes);
app.use('/account', accountRoutes);
app.use('/itemgroup', itemGroupRoutes);
app.use('/item', itemRoutes);
app.use('/vendor', vendorRoutes);
app.use('/vendordetails', vendorDetailsRoutes);
app.use('/salesinfo', salesInfoRoutes);
app.use('/purchaseinfo', purchaseInfoRoutes);

// Routes
app.get('/', (req, res) => {
    res.send("We are on home page");
});

// Connect to database
mongoose.connect(process.env.DB_Connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log("Connected to MongoDB!");
});

// Listening to the server
app.listen(port, () => {
    console.log("Server listening on port", port);
});