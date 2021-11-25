const { Router } = require("express");
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));


// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
  express.urlencoded({
    extended: false
  })
);
// set up sessions
app.use(session({
  'store': new FileStore(),
  'secret': 'keyboard cat',
  'resave': false, //session will not be resaved if there are no changes
  'saveUninitialized': true // if a client connects with no session, immediately create one
  }))

//flash 
app.use(flash())
// Register Flash middleware
app.use(function (req, res, next) {
res.locals.success_messages = req.flash("success_messages");
res.locals.error_messages = req.flash("error_messages");
next();
});


//Import Routes
const landingRoutes = require('./routes/landing');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

//async function
async function main() {
    app.use('/keyboardshop', landingRoutes);
    app.use('/products', productRoutes);
    app.use('/users', userRoutes);



    
//end of main function 
}

main();

app.listen(3000, () => {
  console.log("Server has started");
});