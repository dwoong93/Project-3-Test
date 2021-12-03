const express = require("express");
const router = express.Router();

const CartServices = require('../services/cart_services');

router.get('/', async(req,res)=>{
    let cart = new CartServices(req.session.user.id);

    res.render('cart/index', {
        'shoppingCart': (await cart.getCart()).toJSON()
    })
})

router.get('/:product_id/add', async (req,res)=>{
    let cart = new CartServices(req.session.user.id);
    await cart.addToCart(req.params.product_id, 1);
    req.flash('success_messages', 'Successfully added to cart')
    res.redirect('/products/keyboardcases')
})

module.exports= router;