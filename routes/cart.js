const express = require('express');
const CartServices = require('../services/cart_services');
const router = express.Router();

// router.get('/basket', async(req,res)=>{
//     let cart = new CartServices(req.session.customer.id);

//     res.render('carts/index', {
//         'shoppingCart': (await cart.getCart()).toJSON()
//     })
// })

//add to cart
router.get('/:product_id/add', async function(req,res){
    let cart = new CartServices(req.session.customer.id);
    cart.addToCart(req.params.product_id, 1);
    req.flash("success_messages", "Product has been added to cart");
    res.redirect('/products/all');
})

//remove from cart
router.get('/:product_id/remove', async function(req,res){
    let cart = new CartServices(req.session.customer.id);
    let removed =cart.removeFromCart(req.params.product_id);
    if (removed) {
        req.flash('success_messages', "Product removed from shopping cart");
    } else {
        req.flash("error_messages", "The product does not exist in the cart");
    }
    res.redirect('/cart/basket')
})


router.post('/:product_id/quantity', async function(req,res){
    let newQuantity = req.body.newQuantity;
    let cart = new CartServices(req.session.customer.id);
    let status = await cart.updateQuantity(req.params.product_id, newQuantity);
    console.log(req.params.product_id)
    if (status) {
        req.flash("success_messages", "Quantity updated");
        res.redirect('/cart/basket');
    } else {
        req.flash('error_messages', "Error encountered");
        res.redirect('/cart/basket');
    }
   
})


router.get('/basket', async function(req,res){
    let cart = new CartServices(req.session.customer.id);
    let cartContent = await cart.getCart();
    res.render('carts/index',{
        'shoppingCart': cartContent.toJSON()
    })
})
    



module.exports= router;