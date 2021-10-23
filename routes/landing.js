const express = require("express");
const router = express.Router();


//Express Router
router.get('/', (req,res)=>{
    res.render('landing/index')
});

router.get('/about', (req,res)=>{
    res.render('landing/about')
});

router.get('/catalog', (req,res)=>{
    res.render('landing/catalog')
});
//Export Router
module.exports = router;