const express = require('express');
const CartServices = require('../services/cart_services');
const router = express.Router();
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

router.get('/', async function(req,res){
    // in stripe -- a payment object represents one transaction
    // a payment is defined by many line items
    let lineItems = [];
    let meta = [];

    let cart = new CartServices(req.session.customer.id);
    let items = await cart.getCart();

    // STEP 1 - create the line items
    for (let item of items) {
        // the keys of a line item are predefined and fixed by Stripe
        // and all of them must be present        
        let lineItem = {
            'name': item.related('product').get('name'),
            'amount': item.related('product').get('cost'),
            'quantity': item.get('quantity'),
            'currency': 'SGD'
        }
        if (item.related('product').get('image_url')) {
            lineItem['images'] = [ item.related('product').get('image_url')]
        }
        // add the line item to the array of line items
        lineItems.push(lineItem);
        
        // add in the id of the product and the quantity
        meta.push({
            'customer_id': item.get('customer_id'),
            'username': item.get('username'),
            'contact': item.get('contact'),
            'address': item.get('address'),
            'product_id': item.get('product_id'),
            'quantity': item.get('quantity')
        })
    }

    // STEP 2 - create stripe payment object

    // convert our meta data into a JSON string
    let metaData = JSON.stringify(meta);
    // the keys of the payment object are fixed by stripe
    // all of them are complusory (except metadata)
    const payment = {
        'payment_method_types':['card'],
        'line_items': lineItems,
        'success_url': process.env.STRIPE_SUCCESS_URL,
        'cancel_url': process.env.STRIPE_ERROR_URL,
        'metadata': {
            'orders': metaData,
            'customer_id':req.session.customer_id,
            'username':req.session.username
        }        
    }

    // create the payment session with the payment object
    let stripeSession = await Stripe.checkout.sessions.create(payment);
    res.render('checkout/checkout',{
        'sessionId': stripeSession.id,
        'publishableKey': process.env.STRIPE_PUBLISHABLE_KEY
    })



})

router.post('/process_payment', bodyParser.raw({type: 'application/json'}),async function (req, res){
        let payload = req.body;
        let endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
        let sigHeader = req.headers["stripe-signature"];
        let event;
        try {
            event = Stripe.webhooks.constructEvent(payload, sigHeader, endpointSecret);
        } catch (e) {
            res.send({
                'error': e.message
            })
            console.log(e.message)
            }
            if (event.type == 'checkout.session.completed') {
                let stripeSession = event.data.object;
                console.log(stripeSession);
                // process stripeSession
            }
            res.send({
                received: true
            });
})


router.get('/success', function(req,res){
    res.render('checkout/success');
    
})
router.get('/error', function(req,res){
    res.render('checkout/error')
})



    




























module.exports = router;