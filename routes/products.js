const express = require("express");
const router = express.Router();
// import in  Forms
const { bootstrapField, createProductForm } = require('../forms');

// #1 import in the Product model
const {Keyboardcase} = require('../models')

router.get('/keyboardcases', async function(req,res){
    let keebCases = await Keyboardcase.collection().fetch();
    res.render('products/index',{
        'keyboardcases':keebCases.toJSON()
    }) 
})
// router.get('/keyboardCases', async(req,res)=>{
//     let q = await Keyboardcase.collection().fetch();
//     res.render('products/index', {
//         'q': q.toJSON()      
//     })
// })
// create product
// -------------------------------------------------------------------------------
router.get('/keyboardcases/createproduct', async (req, res) => {
    const productForm = createProductForm();
    res.render('products/create',{
    'form': productForm.toHTML(bootstrapField)
    })
})
//post created product
router.post('/keyboardcases/createproduct', async(req,res)=>{
    const productForm = createProductForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Keyboardcase();
            product.set('name', form.data.name);
            product.set('material', form.data.material);
            product.set('name', form.data.name);
            product.set('size', form.data.size);
            product.set('keyboardKit', form.data.keyboardKit);
            product.set('quantity', form.data.quantity);
            product.set('cost', form.data.cost);
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/keyboardcases');
        },
        'error': async (form) => {
            res.render('products/create', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})








module.exports = router;