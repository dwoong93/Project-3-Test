const { Router } = require("express");
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const session = require('express-session');
const flash = require('connect-flash');
const FileStore = require('session-file-store')(session);
const csrf = require('csurf');
const cloudinaryRoutes = require('./routes/cloudinary.js')
const bodyParser = require('body-parser')


// console.log(process.env.CLOUDINARY_NAME)
// console.log(process.env.CLOUDINARY_API_KEY)
// console.log(process.env.CLOUDINARY_API_SECRET)
// console.log(process.env.CLOUDINARY_UPLOAD_PRESET)

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));
app.use("/bootstrap",express.static(__dirname+"/node_modules/bootstrap/dist"))


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
  'secret': process.env.SESSION_SECRET_KEY,
  'resave': false, //session will not be resaved if there are no changes
  'saveUninitialized': true // if a client connects with no session, immediately create one
  }))

//flash 
app.use(flash());

// Register Flash middleware
app.use(function (req, res, next) {
res.locals.success_messages = req.flash("success_messages");
res.locals.error_messages = req.flash("error_messages");
next();
});

// enable CSRF
// app.use(csrf());
// note: replaced app.use(csrf()) with the following:
const csurfInstance = csrf();
app.use(function(req,res,next){
  console.log("checking for csrf exclusion")
  // exclude whatever url we want from CSRF protection
  if (req.url === "/checkout/process_payment") {
   return next();
  }
csurfInstance(req,res,next);
})

// Share CSRF with hbs files
app.use(function(req,res,next){
  // res.locals.csrfToken = req.csrfToken();
  if (req.csrfToken) {
    res.locals.csrfToken = req.csrfToken();
    }
    
  next();
  })  

// Share the user data with hbs files
app.use(function(req,res,next){
  res.locals.user = req.session.user;
  next();
})

app.use(function(req,res,next){
  res.locals.customer = req.session.customer;
  next();
})
  

//Import Routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const shoppingCartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout')
const mainRoutes = require('./routes/main');



//async function
async function main() {
    app.use('', mainRoutes)
    app.use('/products', productRoutes);
    app.use('/users', userRoutes);
    app.use('/cloudinary', cloudinaryRoutes);
    app.use('/cart', shoppingCartRoutes);
    app.use('/checkout', checkoutRoutes);
    



    
//end of main function 
}

main();

app.listen(3000, () => {
  console.log("Server has started");
});