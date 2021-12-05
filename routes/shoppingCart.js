const express = require("express");
const router = express.Router();

const CartServices = require('../services/cart_services');

router.get('/basket', async(req,res)=>{
    let cart = new CartServices(req.session.customer.id);

    res.render('carts/index', {
        'shoppingCart': (await cart.getCart()).toJSON()
    })
})

//add to cart
router.get('/:product_id/add', async (req,res)=>{
    let cart = new CartServices(req.session.customer.id);
    await cart.addToCart(req.params.product_id, 1);
    req.flash('success_messages', 'Successfully added to cart')
    res.redirect('/products/all')
})

//remove from cart
router.get('/:product_id/remove', async(req,res)=>{
    let cart = new CartServices(req.session.customer.id);
    await cart.remove(req.params.product_id);

    req.flash("success_messages", "Item has been removed");
    res.redirect('/cart/basket');
})


router.post('/:product_id/quantity/update', async(req,res)=>{
    let cart = new CartServices(req.session.customer.id);
    await cart.setQuantity(req.params.product_id, req.body.newQuantity);
    req.flash("success_messages", "Quantity updated")
    res.redirect('/cart/basket');
    })
    



module.exports= router;