const express = require("express");
const router = express.Router();
// import in  Forms
const { bootstrapField, createkeyboardCaseForm, 
    createkeyboardPcbForm, createkeyboardPlateForm, 
    createkeyboardSwitchForm, createkeyboardKeycapForm,
    createkeyboardStabilizerForm} = require('../forms');

// #1 import in the Product model
const {Keyboardcase, Keyboardpcb, Keyboardplate, Keyboardswitch, Keyboardkeycap, Keyboardstabilizer, Category} = require('../models')

//Display keyboard Cases
router.get('/catalog', async function(req,res){
    let keebCases = await Keyboardcase.collection().fetch({withRelated:['category']});
    let keebPcb = await Keyboardpcb.collection().fetch({withRelated:['category']});
    let keebPlate = await Keyboardplate.collection().fetch({withRelated:['category']});
    let keebSwitch = await Keyboardswitch.collection().fetch();
    let keebKeycap = await Keyboardkeycap.collection().fetch();
    let keebStabilizer = await Keyboardstabilizer.collection().fetch();

    res.render('products/index',{
        'keyboardcases':keebCases.toJSON(),
        'keyboardpcb':keebPcb.toJSON(),
        'keyboardplate':keebPlate.toJSON(),
        'keyboardswitch':keebSwitch.toJSON(),
        'keyboardkeycap':keebKeycap.toJSON(),
        'keyboardstabilizer':keebStabilizer.toJSON()

    }) 
})
//////////////////////////////////CREATE///////////////////////////////////////////
// Create keyboardCase
router.get('/keyboardcases/create', async (req, res) => {
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const productForm = createkeyboardCaseForm(allCategories);
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
            product.set('brand', form.data.brand);
            product.set('material', form.data.material);
            product.set('category_id', form.data.category_id);
            product.set('quantity', form.data.quantity);
            product.set('keyboardKit', form.data.keyboardKit);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/catalog');
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
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const productForm = createkeyboardPcbForm(allCategories);
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
            product.set('brand', form.data.brand);
            product.set('switchConnectionType', form.data.switchConnectionType);
            product.set('category_id', form.data.category_id);
            product.set('quantity', form.data.quantity);
            product.set('keyboardKit', form.data.keyboardKit);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/catalog');
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
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const productForm = createkeyboardPlateForm(allCategories);
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
            product.set('brand', form.data.brand);
            product.set('plateMaterial', form.data.plateMaterial);
            product.set('category_id', form.data.category_id);
            product.set('quantity', form.data.quantity);
            product.set('keyboardKit', form.data.keyboardKit);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/catalog');
        },
        'error': async (form) => {
            res.render('products/createplate', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//create keyboard switch
router.get('/keyboardswitch/create', async (req, res) => {
    const productForm = createkeyboardSwitchForm();
    res.render('products/createswitch',{
    'form': productForm.toHTML(bootstrapField)
    })
})

// post created switch
router.post('/keyboardswitch/create', async(req,res)=>{
    const productForm = createkeyboardSwitchForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Keyboardswitch();
            product.set('name', form.data.name);
            product.set('brand', form.data.brand);
            product.set('switchType', form.data.switchType);
            product.set('quantity', form.data.quantity);
            product.set('switchConnectionType', form.data.switchConnectionType);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/catalog');
        },
        'error': async (form) => {
            res.render('products/createswitch', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//create keyboard keycap
router.get('/keyboardkeycap/create', async (req, res) => {
    const productForm = createkeyboardKeycapForm();
    res.render('products/createkeycap',{
    'form': productForm.toHTML(bootstrapField)
    })
})

// post created keycap
router.post('/keyboardkeycap/create', async(req,res)=>{
    const productForm = createkeyboardKeycapForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Keyboardkeycap();
            product.set('name', form.data.name);
            product.set('brand', form.data.brand);
            product.set('size', form.data.size);
            product.set('keycapMaterial', form.data.keycapMaterial);
            product.set('keycapProfile', form.data.keycapProfile);
            product.set('quantity', form.data.quantity);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/catalog');
        },
        'error': async (form) => {
            res.render('products/createkeycap', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//create keyboard stabilizer
router.get('/keyboardstabilizer/create', async (req, res) => {
    const productForm = createkeyboardStabilizerForm();
    res.render('products/createstabilizer',{
    'form': productForm.toHTML(bootstrapField)
    })
})

// post created stabilizer
router.post('/keyboardstabilizer/create', async(req,res)=>{
    const productForm = createkeyboardStabilizerForm();
    productForm.handle(req, {
        'success': async (form) => {
            const product = new Keyboardstabilizer();
            product.set('name', form.data.name);
            product.set('brand', form.data.brand);
            product.set('stabilizerType', form.data.stabilizerType);
            product.set('quantity', form.data.quantity);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            await product.save();
            res.redirect('/products/catalog');
        },
        'error': async (form) => {
            res.render('products/createstabilizer', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})



//////////////////////////////////UPDATE////////////////////////////////////////////////
//update KeyboardCase by id
router.get('/keyboardcase/:product_id/update', async (req, res) => {
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const productId = req.params.product_id;
    const keebCases = await Keyboardcase.where({
        'id': productId}).fetch({
            require: true
        });
        // console.log(productId);
        // console.log(keebCases)

        const productForm = createkeyboardCaseForm(allCategories);
        
        productForm.fields.name.value = keebCases.get('name');
        productForm.fields.brand.value = keebCases.get('brand');
        productForm.fields.material.value = keebCases.get('material');
        productForm.fields.category_id.value = keebCases.get('category_id');
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
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    // fetch the product that we want to update
    const keebCases = await Keyboardcase.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardCaseForm(allCategories);
    productForm.handle(req,{
        'success': async (form)=>{
            keebCases.set(form.data);
            keebCases.save();
            res.redirect('/products/catalog');
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
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const productId = req.params.product_id;
    const keebPcb = await Keyboardpcb.where({
        'id': productId}).fetch({
            require: true
        });

        const productForm = createkeyboardPcbForm(allCategories);
        
        productForm.fields.name.value = keebPcb.get('name');
        productForm.fields.brand.value = keebPcb.get('brand');
        productForm.fields.switchConnectionType.value = keebPcb.get('switchConnectionType');
        productForm.fields.category_id.value = keebPcb.get('category_id');
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
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    // fetch the product that we want to update
    const keebPcb = await Keyboardpcb.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardPcbForm(allCategories);
    productForm.handle(req,{
        'success': async (form)=>{
            keebPcb.set(form.data);
            keebPcb.save();
            res.redirect('/products/catalog');
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
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const productId = req.params.product_id;
    const keebPlate = await Keyboardplate.where({
        'id': productId}).fetch({
            require: true
        });

        const productForm = createkeyboardPlateForm(allCategories);
        
        productForm.fields.name.value = keebPlate.get('name');
        productForm.fields.brand.value = keebPlate.get('brand');
        productForm.fields.plateMaterial.value = keebPlate.get('plateMaterial');
        productForm.fields.category_id.value = keebPlate.get('category_id');
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
router.post('/keyboardplate/:product_id/update', async (req, res) => {
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    // fetch the product that we want to update
    const keebPlate = await Keyboardplate.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardPlateForm(allCategories);
    productForm.handle(req,{
        'success': async (form)=>{
            keebPlate.set(form.data);
            keebPlate.save();
            res.redirect('/products/catalog');
        },
        'error':async (form) =>{
            res.render('products/updateplate',{
                'form': form.toHTML(bootstrapField),
                'keyboardplate': keebPlate.toJSON()
            })
        }
    })
    
})

//update KeyboardSwitch by id
router.get('/keyboardswitch/:product_id/update', async (req, res) => {
    const productId = req.params.product_id;
    const keebSwitch = await Keyboardswitch.where({
        'id': productId}).fetch({
            require: true
        });

        const productForm = createkeyboardSwitchForm();
        
        productForm.fields.name.value = keebSwitch.get('name');
        productForm.fields.brand.value = keebSwitch.get('brand');
        productForm.fields.switchType.value = keebSwitch.get('switchType');
        productForm.fields.switchConnectionType.value = keebSwitch.get('switchConnectionType');
        productForm.fields.quantity.value = keebSwitch.get('quantity');
        productForm.fields.cost.value = keebSwitch.get('cost');
        productForm.fields.description.value = keebSwitch.get('description');

        res.render('products/updateswitch', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardswitch':keebSwitch.toJSON()
        })

})

//process update of KeyboardSwitch
router.post('/keyboardswitch/:product_id/update', async (req, res) => {
    // fetch the product that we want to update
    const keebSwitch = await Keyboardswitch.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardSwitchForm();
    productForm.handle(req,{
        'success': async (form)=>{
            keebSwitch.set(form.data);
            keebSwitch.save();
            res.redirect('/products/catalog');
        },
        'error':async (form) =>{
            res.render('products/updateswitch',{
                'form': form.toHTML(bootstrapField),
                'keyboardswitch': keebSwitch.toJSON()
            })
        }
    })
    
})

//update KeyboardKeycap by id
router.get('/keyboardkeycap/:product_id/update', async (req, res) => {
    const productId = req.params.product_id;
    const keebKeycap = await Keyboardkeycap.where({
        'id': productId}).fetch({
            require: true
        });

        const productForm = createkeyboardKeycapForm();
        
        productForm.fields.name.value = keebKeycap.get('name');
        productForm.fields.brand.value = keebKeycap.get('brand');
        productForm.fields.size.value = keebKeycap.get('size');
        productForm.fields.keycapMaterial.value = keebKeycap.get('keycapMaterial');
        productForm.fields.keycapProfile.value = keebKeycap.get('keycapProfile');
        productForm.fields.quantity.value = keebKeycap.get('quantity');
        productForm.fields.cost.value = keebKeycap.get('cost');
        productForm.fields.description.value = keebKeycap.get('description');

        res.render('products/updatekeycap', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardkeycap':keebKeycap.toJSON()
        })

})

//process update of KeyboardKeycap
router.post('/keyboardkeycap/:product_id/update', async (req, res) => {
    // fetch the product that we want to update
    const keebKeycap = await Keyboardkeycap.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardKeycapForm();
    productForm.handle(req,{
        'success': async (form)=>{
            keebKeycap.set(form.data);
            keebKeycap.save();
            res.redirect('/products/catalog');
        },
        'error':async (form) =>{
            res.render('products/updatekeycap',{
                'form': form.toHTML(bootstrapField),
                'keyboardkeycap': keebKeycap.toJSON()
            })
        }
    })
    
})

//update KeyboardStabilizer by id
router.get('/keyboardstabilizer/:product_id/update', async (req, res) => {
    const productId = req.params.product_id;
    const keebStabilizer = await Keyboardstabilizer.where({
        'id': productId}).fetch({
            require: true
        });

        const productForm = createkeyboardStabilizerForm();
        
        productForm.fields.name.value = keebStabilizer.get('name');
        productForm.fields.brand.value = keebStabilizer.get('brand');
        productForm.fields.stabilizerType.value = keebStabilizer.get('stabilizerType');
        productForm.fields.quantity.value = keebStabilizer.get('quantity');
        productForm.fields.cost.value = keebStabilizer.get('cost');
        productForm.fields.description.value = keebStabilizer.get('description');

        res.render('products/updatestabilizer', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardstabilizer':keebStabilizer.toJSON()
        })

})

//process update of KeyboardStabilizer
router.post('/keyboardstabilizer/:product_id/update', async (req, res) => {
    // fetch the product that we want to update
    const keebStabilizer = await Keyboardstabilizer.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardStabilizerForm();
    productForm.handle(req,{
        'success': async (form)=>{
            keebStabilizer.set(form.data);
            keebStabilizer.save();
            res.redirect('/products/catalog');
        },
        'error':async (form) =>{
            res.render('products/updatestabilizer',{
                'form': form.toHTML(bootstrapField),
                'keyboardstabilizer': keebStabilizer.toJSON()
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
    res.redirect('/products/catalog')
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
    res.redirect('/products/catalog')
})

//Delete keyboardPlate
router.get('/keyboardplate/:product_id/delete', async (req, res) => {
    const productId = req.params.product_id;
    const keebPlate = await Keyboardplate.where({
        'id': productId}).fetch({
            require: true
        });
        res.render('products/deleteplate', {
            'keyboardplate':keebPlate.toJSON()
        })
})
//process delete keyboardPlate
router.post('/keyboardplate/:product_id/delete', async (req, res) => {
    const keebPlate = await Keyboardplate.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebPlate.destroy();
    res.redirect('/products/catalog')
})

//Delete keyboardSwitch
router.get('/keyboardswitch/:product_id/delete', async (req, res) => {
    const productId = req.params.product_id;
    const keebSwitch = await Keyboardswitch.where({
        'id': productId}).fetch({
            require: true
        });
        res.render('products/deleteswitch', {
            'keyboardswitch':keebSwitch.toJSON()
        })
})
//process delete keyboardSwitch
router.post('/keyboardswitch/:product_id/delete', async (req, res) => {
    const keebSwitch = await Keyboardswitch.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebSwitch.destroy();
    res.redirect('/products/catalog')
})

//Delete keyboardKeycap
router.get('/keyboardkeycap/:product_id/delete', async (req, res) => {
    const productId = req.params.product_id;
    const keebKeycap = await Keyboardkeycap.where({
        'id': productId}).fetch({
            require: true
        });
        res.render('products/deletekeycap', {
            'keyboardkeycap':keebKeycap.toJSON()
        })
})
//process delete keyboardKeycap
router.post('/keyboardkeycap/:product_id/delete', async (req, res) => {
    const keebKeycap = await Keyboardkeycap.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebKeycap.destroy();
    res.redirect('/products/catalog')
})

//Delete keyboardStabilizer
router.get('/keyboardstabilizer/:product_id/delete', async (req, res) => {
    const productId = req.params.product_id;
    const keebStabilizer = await Keyboardstabilizer.where({
        'id': productId}).fetch({
            require: true
        });
        res.render('products/deletestabilizer', {
            'keyboardstabilizer':keebStabilizer.toJSON()
        })
})
//process delete keyboardStabilizer
router.post('/keyboardstabilizer/:product_id/delete', async (req, res) => {
    const keebStabilizer = await Keyboardstabilizer.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebStabilizer.destroy();
    res.redirect('/products/catalog')
})







module.exports = router;