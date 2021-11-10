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

//update product by id
router.get('/:product_id/update', async (req, res) => {
    const productId = req.params.product_id;
    const keebCases = await Keyboardcase.where({
        'id': productId}).fetch({
            require: true
        });
        console.log(productId);
        console.log(keebCases)


        const productForm = createProductForm();
        

        productForm.fields.name.value = keebCases.get('name');
        productForm.fields.material.value = keebCases.get('material');
        productForm.fields.size.value = keebCases.get('size');
        productForm.fields.keyboardKit.value = keebCases.get('keyboardKit');
        productForm.fields.quantity.value = keebCases.get('quantity');
        productForm.fields.cost.value = keebCases.get('cost');
        productForm.fields.description.value = keebCases.get('description');

        res.render('products/update', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardcases':keebCases.toJSON()
        })
        res.render('products/update')
    })
//process update
router.post('/:product_id/update', async (req, res) => {
    // fetch the product that we want to update
    const keebCases = await Keyboardcase.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createProductForm();
    productForm.handle(req,{
        'success': async (form)=>{
            keebCases.set(form.data);
            keebCases.save();
            res.redirect('/products/keyboardcases');
        },
        'error':async (form) =>{
            res.render('products/update',{
                'form': form.toHTML(bootstrapField),
                'keyboardcases': keebCases.toJSON()
            })
        }
    })
    
        
        

})









module.exports = router;