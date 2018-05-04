const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const Keys = require('./config/keys');
// const path = require('path');
const app = express();


// Load User Model
require('./models/User')
// Passport config
require('./config/passport')(passport);


// Mongoose connect
mongoose.connect(Keys.mongoURI, {
})
    .then(() => console.log('Mongo Db Connected'))
    .catch((err) => {
        console.log(err);
    });

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');


// Express-handlebars MiddleWare
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// // Static Folder
// app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', index);
app.use('/auth', auth);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});