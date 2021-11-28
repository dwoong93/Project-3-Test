const express = require("express");
const {checkIfAuthenticated} = require('../middlewares');
const router = express.Router();
const crypto = require('crypto');
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}
// import in the User model
const { User } = require('../models');
const { createRegistrationForm, createLoginForm, UpdateAccountForm, bootstrapField } = require('../forms');

// router.get('/user', async function(req,res){
//     let keebCases = await Keyboardcase.collection().fetch({withRelated:['category']});

//     res.render('products/index',{
//         'keyboardcases':keebCases.toJSON(),

//     }) 
// })

//user registration
router.get('/register', checkIfAuthenticated, (req,res)=>{
    const registerForm = createRegistrationForm();
    res.render('users/register', {
        'form': registerForm.toHTML(bootstrapField),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})
module.exports = router;
//process user reg
router.post('/register', (req, res) => {
    const registerForm = createRegistrationForm();
    registerForm.handle(req, {
        success: async (form) => {
            const user = new User({
                'username': form.data.username,
                'password': getHashedPassword(form.data.password),
                'email': form.data.email,
                'image_url': form.data.image_url
            });
            await user.save();
            req.flash("success_messages", "New staff account registration is complete.");
            res.redirect('/users/login')
        },
        'error': (form) => {
            res.render('users/register', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//update user by id
router.get('/user/:user_id/update', async (req, res) => {
    const userId = req.params.user_id
    const user = await User.where({
        'id': userId}).fetch({
            require: true,
        });

        const userForm = UpdateAccountForm();
        
        userForm.fields.username.value = user.get('username');
        userForm.fields.email.value = user.get('email');
        userForm.fields.password.value = user.get('password');
        
        

        res.render('users/userupdate', {
            'form': userForm.toHTML(bootstrapField),
            'user':user.toJSON()
        })
})

//Process update user by id
router.post('/user/:user_Id/update', async (req, res) => {
    const user = await User.where({
        'id': req.params.user_Id}).fetch({
            require: true,
        });

        const userForm = UpdateAccountForm();
        userForm.handle(req, {
            'success': async (form) => {
                user.set('username', form.data.username);
                user.set('email', form.data.email);
                user.set('password',getHashedPassword(form.data.password));
                await user.save();
                res.redirect('/products/catalog');
            },
            'error': async (form) => {
                res.render('user/update', {
                'form': form.toHTML(bootstrapField)
                })
            }
        })
})


//login
router.get('/login', (req, res) => {
    const loginForm = createLoginForm();
    res.render('users/login', {
        'form': loginForm.toHTML(bootstrapField)
    })
})


//process login
router.post('/login', async (req, res) => {
const loginForm = createLoginForm();
    loginForm.handle(req, {
        'success': async (form) => {
            // process the login
            // ...find the user by email and password
            let user = await User.where({
                'email': form.data.email
            }).fetch({
                require: false
            });
            if (!user) {
                req.flash("error_messages", "Sorry, the login details that you have provided is not correct.")
                    res.redirect('/users/login');
            }
                else {
                    // check if the password matches
                    if (user.get('password') === getHashedPassword(form.data.password)) {
                        // add to the session that login succeed
                        // store the user details
                        req.session.user = {
                            id: user.get('id'),
                            username: user.get('username'),
                            email: user.get('email')
                        }
                        req.flash("success_messages", "Welcome back, " + user.get('username'));
                        res.redirect('/users/profile');
                    } 
                    else {
                        req.flash("error_messages", "Sorry, the login details that you have provided is not correct.")
                            res.redirect('/users/login')
                    }
                }
        }, 
        'error': (form) => {
            req.flash("error_messages", "There is a problem with the login, please fill in the form again ")
                res.render('users/login', {
                    'form': form.toHTML(bootstrapField)
                })
        }
    })
})


//profile
router.get('/profile', (req, res) => {
    const user = req.session.user;
    if (!user) {
        req.flash('error_messages', 'You do not have permission to view this page')
        return res.redirect('/users/login');
    }
    else {
    res.render('users/profile',{
        'user': user})
    }
})


//logout
router.get('/logout', (req, res) => {
    req.session.user = null;
    req.flash('success_messages', "Logged out successfully, Goodbye");
    res.redirect('/users/login');
    })
    

       