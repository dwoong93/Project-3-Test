const express = require("express");
const router = express.Router();

// #1 import in the Product model
const {Keyboardcase} = require('../models')

router.get('/', async (req,res)=>{
// #2 - fetch all the products (ie, SELECT * from keyboardCase)
    let q = await Keyboardcase.collection().fetch();
    res.render('products/index', {
        'q': q.toJSON() // #3 - convert collection to JSON
        
    })
})
module.exports = router;