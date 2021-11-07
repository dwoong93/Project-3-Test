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
router.get('/:product_id/update', async (req, res) => {
    const productId = req.params.product_id;
    const keebCases = await Keyboardcase.where({
        'id': productId}).fetch({
            require: true
        });
        console.log(productId);
        console.log(keebCases)


        // const productForm = createProductForm();

        // productForm.fields.name.value = Keyboardcase.get('name');
        // productForm.fields.material.value = Keyboardcase.get('material');
        // productForm.fields.size.value = Keyboardcase.get('size');
        // productForm.fields.keyboardKit.value = Keyboardcase.get('keyboardKit');
        // productForm.fields.quantity.value = Keyboardcase.get('quantity');
        // productForm.fields.cost.value = Keyboardcase.get('cost');
        // productForm.fields.description.value = Keyboardcase.get('description');

        // res.render('products/update', {
        //     'form': productForm.toHTML(bootstrapField),
        //     'product': product.toJSON()
        // })
        res.render('products/update')
    })
//process update
router.post('/:product_id/update', async (req, res) => {
    const keebCases = await Keyboardcase.where({
        'id': productId}).fetch({
            require: true
        });
    const productForm = createProductForm();
    productForm.handle(req,{
        'success': async (form)=>{
            product.set(form.data);
            product.save();
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