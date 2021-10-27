const express = require("express");
const router = express.Router();

// #1 import in the Product model
const {keyboardCase, keyboardCase} = require('../models')

router.get('/', async (req,res)=>{
// #2 - fetch all the products (ie, SELECT * from keyboardCase)
    let keyboardCase = await keyboardCase.collection().fetch();
    res.render('products/index', {
        'keyboardCase': keyboardCase.toJSON() // #3 - convert collection to JSON
    })
})
module.exports = router;