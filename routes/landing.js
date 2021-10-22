const express = require("express");
const router = express.Router();


//Express Router
router.get('/', (req,res)=>{
    res.render('landing/index')
})

//Export Router
module.exports = router;