const express = require("express");
const router = express.Router();

//Display keyboard products for Customer
router.get('', function(req,res){
    res.render('layouts/landingpage')
})

module.exports = router;