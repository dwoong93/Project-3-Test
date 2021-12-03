const express = require("express");
const router = express.Router();

//Display keyboard products for Customer
router.get('', function(req,res){
    res.redirect('/products/catalog')
})

module.exports = router;