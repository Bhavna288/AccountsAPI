require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 1337;

const app = express();

// Github Repository: https://github.com/Bhavna288/AccountsAPI.git

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to database
mongoose.connect(process.env.DB_Connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log("Connected to MongoDB!");
});

require('./router.js')(app);

// Listening to the server
app.listen(port, () => {
    console.log("Server listening on port", port);
});
