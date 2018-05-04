const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Create Schema
const userSchema = new Schema({
    googleID: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    image: {
        type: String
    }
});

// Create connection and add schema
mongoose.model('users', userSchema);