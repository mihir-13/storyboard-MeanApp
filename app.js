const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();

// Passport config
require('./config/passport')(passport);



// Load Routes
const auth = require('./routes/auth');

// Use routes
app.use('/auth', auth);



const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
res.send("Hello");
});








app.listen(port, () => {
    console.log(`Server started on ${port}`);
});