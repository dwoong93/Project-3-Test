const express = require("express");
const router = express.Router();
// import in  Forms
const { bootstrapField, createkeyboardCaseForm, createkeyboardPcbForm, createkeyboardPlateForm} = require('../forms');

// #1 import in the Product model
const {Keyboardcase, Keyboardpcb, Keyboardplate} = require('../models')

//Display keyboard Cases
router.get('/keyboardcases', async function(req,res){
    let keebCases = await Keyboardcase.collection().fetch();
    let keebPcb = await Keyboardpcb.collection().fetch();
    let keebPlate = await Keyboardplate.collection().fetch();
    res.render('products/index',{
        'keyboardcases':keebCases.toJSON(),
        'keyboardpcb':keebPcb.toJSON(),
        'keyboardplate':keebPlate.toJSON()
    }) 
})
//////////////////////////////////CREATE///////////////////////////////////////////
// Create keyboardCase
router.get('/keyboardcases/create', async (req, res) => {
    const productForm = createkeyboardCaseForm();
    res.render('products/createcase',{
    'form': productForm.toHTML(bootstrapField)
    })
})
// post created KeyboardCase
router.post('/keyboardcases/create', async(req,res)=>{
    const productForm = createkeyboardCaseForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Keyboardcase();
            product.set('name', form.data.name);
            product.set('material', form.data.material);
            product.set('size', form.data.size);
            product.set('quantity', form.data.quantity);
            product.set('keyboardKit', form.data.keyboardKit);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/keyboardcases');
        },
        'error': async (form) => {
            res.render('products/createpcb', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//create keyboard pcb
router.get('/keyboardpcb/create', async (req, res) => {
    const productForm = createkeyboardPcbForm();
    res.render('products/createpcb',{
    'form': productForm.toHTML(bootstrapField)
    })
})

// post created pcb
router.post('/keyboardpcb/create', async(req,res)=>{
    const productForm = createkeyboardPcbForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Keyboardpcb();
            product.set('name', form.data.name);
            product.set('switchConnectionType', form.data.switchConnectionType);
            product.set('size', form.data.size);
            product.set('quantity', form.data.quantity);
            product.set('keyboardKit', form.data.keyboardKit);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/keyboardcases');
        },
        'error': async (form) => {
            res.render('products/createpcb', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//create keyboard plate
router.get('/keyboardplate/create', async (req, res) => {
    const productForm = createkeyboardPlateForm();
    res.render('products/createplate',{
    'form': productForm.toHTML(bootstrapField)
    })
})

// post created plate
router.post('/keyboardplate/create', async(req,res)=>{
    const productForm = createkeyboardPlateForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Keyboardplate();
            product.set('name', form.data.name);
            product.set('plateMaterial', form.data.plateMaterial);
            product.set('size', form.data.size);
            product.set('quantity', form.data.quantity);
            product.set('keyboardKit', form.data.keyboardKit);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/keyboardcases');
        },
        'error': async (form) => {
            res.render('products/createplate', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//////////////////////////////////UPDATE////////////////////////////////////////////////
//update KeyboardCase by id
router.get('/keyboardcase/:product_id/update', async (req, res) => {
    const productId = req.params.product_id;
    const keebCases = await Keyboardcase.where({
        'id': productId}).fetch({
            require: true
        });
        // console.log(productId);
        // console.log(keebCases)

        const productForm = createkeyboardCaseForm();
        
        productForm.fields.name.value = keebCases.get('name');
        productForm.fields.material.value = keebCases.get('material');
        productForm.fields.size.value = keebCases.get('size');
        productForm.fields.keyboardKit.value = keebCases.get('keyboardKit');
        productForm.fields.quantity.value = keebCases.get('quantity');
        productForm.fields.cost.value = keebCases.get('cost');
        productForm.fields.description.value = keebCases.get('description');

        res.render('products/updatecase', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardcases':keebCases.toJSON()
        })
})
//process update of KeyboardCase
router.post('/keyboardcase/:product_id/update', async (req, res) => {
    // fetch the product that we want to update
    const keebCases = await Keyboardcase.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardCaseForm();
    productForm.handle(req,{
        'success': async (form)=>{
            keebCases.set(form.data);
            keebCases.save();
            res.redirect('/products/keyboardcases');
        },
        'error':async (form) =>{
            res.render('products/updatecase',{
                'form': form.toHTML(bootstrapField),
                'keyboardcases': keebCases.toJSON()
            })
        }
    })
    
})

//update KeyboardPcb by id
router.get('/keyboardpcb/:product_id/update', async (req, res) => {
    const productId = req.params.product_id;
    const keebPcb = await Keyboardpcb.where({
        'id': productId}).fetch({
            require: true
        });
        // console.log(productId);
        // console.log(keebPcb)

        const productForm = createkeyboardPcbForm();
        
        productForm.fields.name.value = keebPcb.get('name');
        productForm.fields.switchConnectionType.value = keebPcb.get('switchConnectionType');
        productForm.fields.size.value = keebPcb.get('size');
        productForm.fields.keyboardKit.value = keebPcb.get('keyboardKit');
        productForm.fields.quantity.value = keebPcb.get('quantity');
        productForm.fields.cost.value = keebPcb.get('cost');
        productForm.fields.description.value = keebPcb.get('description');

        res.render('products/updatepcb', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardpcb':keebPcb.toJSON()
        })

})
//process update of KeyboardPcb
router.post('/keyboardpcb/:product_id/update', async (req, res) => {
    // fetch the product that we want to update
    const keebPcb = await Keyboardpcb.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardPcbForm();
    productForm.handle(req,{
        'success': async (form)=>{
            keebPcb.set(form.data);
            keebPcb.save();
            res.redirect('/products/keyboardcases');
        },
        'error':async (form) =>{
            res.render('products/updatepcb',{
                'form': form.toHTML(bootstrapField),
                'keyboardpcb': keebPcb.toJSON()
            })
        }
    })
    
})

//update KeyboardPlate by id
router.get('/keyboardplate/:product_id/update', async (req, res) => {
    const productId = req.params.product_id;
    const keebPlate = await Keyboardplate.where({
        'id': productId}).fetch({
            require: true
        });
        // console.log(productId);
        // console.log(keebPcb)

        const productForm = createkeyboardPlateForm();
        
        productForm.fields.name.value = keebPlate.get('name');
        productForm.fields.plateMaterial.value = keebPlate.get('plateMaterial');
        productForm.fields.size.value = keebPlate.get('size');
        productForm.fields.keyboardKit.value = keebPlate.get('keyboardKit');
        productForm.fields.quantity.value = keebPlate.get('quantity');
        productForm.fields.cost.value = keebPlate.get('cost');
        productForm.fields.description.value = keebPlate.get('description');

        res.render('products/updateplate', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardplate':keebPlate.toJSON()
        })

})

//process update of KeyboardPlate
router.post('/keyboardpLATE/:product_id/update', async (req, res) => {
    // fetch the product that we want to update
    const keebPlate = await Keyboardplate.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardPlateForm();
    productForm.handle(req,{
        'success': async (form)=>{
            keebPlate.set(form.data);
            keebPlate.save();
            res.redirect('/products/keyboardcases');
        },
        'error':async (form) =>{
            res.render('products/updateplate',{
                'form': form.toHTML(bootstrapField),
                'keyboardplate': keebPlate.toJSON()
            })
        }
    })
    
})

//////////////////////////////////DELETE//////////////////////////////////////////
//Delete keyboardCase
router.get('/keyboardcase/:product_id/delete', async (req, res) => {
    const productId = req.params.product_id;
    const keebCases = await Keyboardcase.where({
        'id': productId}).fetch({
            require: true
        });
        // console.log(productId);
        // console.log(keebCases)


        res.render('products/deletecase', {
            'keyboardcases':keebCases.toJSON()
        })
})
//process delete keyboard Case
router.post('/keyboardcase/:product_id/delete', async (req, res) => {
    const keebCases = await Keyboardcase.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebCases.destroy();
    res.redirect('/products/keyboardcases')
})

//Delete keyboardPcb
router.get('/keyboardpcb/:product_id/delete', async (req, res) => {
    const productId = req.params.product_id;
    const keebPcb = await Keyboardpcb.where({
        'id': productId}).fetch({
            require: true
        });
        // console.log(productId);
        // console.log(keebCases)


        res.render('products/deletepcb', {
            'keyboardpcb':keebPcb.toJSON()
        })
})
//process delete keyboardPcb
router.post('/keyboardpcb/:product_id/delete', async (req, res) => {
    const keebPcb = await Keyboardpcb.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebPcb.destroy();
    res.redirect('/products/keyboardcases')
})








module.exports = router;