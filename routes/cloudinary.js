const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary')

router.get('/sign', async (req,res)=>{
    const params_to_sign = JSON.parse(req.query.params_to_sign);
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const signature = cloudinary.utils.api_sign_request(params_to_sign, apiSecret);
    res.send(signature); //aka csrf
})


module.exports = router;
