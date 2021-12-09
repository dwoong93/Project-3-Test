const express = require("express");
const router = express.Router();
const dataLayer = require('../dal/products')
const {checkIfAuthenticated, checkIfCustomerAuthenticated} = require('../middlewares');
// import in  Forms
const { bootstrapField, createproductForm ,createkeyboardCaseForm, 
    createkeyboardPcbForm, createkeyboardPlateForm, 
    createkeyboardSwitchForm, createkeyboardKeycapForm,
    createkeyboardStabilizerForm, createkeyboardCaseSearchForm,
    createkeyboardPcbSearchForm, createproductSearchForm, createkeyboardKitForm} = require('../forms');

// #1 import in the Product model
const {Product,Keyboardcase, Keyboardpcb, Keyboardplate, Keyboardswitch, Keyboardkeycap, Keyboardstabilizer, Category, Types, Subtypes, Keyboardkit} = require('../models')


//Display keyboard Cases for Admin
router.get('/catalog', checkIfAuthenticated, async function(req,res){
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


// FILTER and display all Products for Admin
router.get('/all', checkIfAuthenticated, async function(req,res){
    //get all categories
    const allCategories = await dataLayer.getAllCategories();
    //create a fake cat that represents search all
    allCategories.unshift([0,'All Layouts']);

    //get all Types
    const allTypes = await dataLayer.getAllTypes();
    //create a fake cat that represents search all
    allTypes.unshift([0,'All Keyboard Components']);

    //get all Subtypes
    const allSubtypes = await dataLayer.getAllSubtypes();
    //create a fake subtype that represents search all
    allSubtypes.unshift([0,'All Component Subtypes']);


    // get all Many-Many relationship kits
    const allKeyboardKits = await dataLayer.getAllKeyboardKits();
    

    //create search form
    let searchForm = createproductSearchForm(allCategories, allTypes, allSubtypes, allKeyboardKits);
    let q = Product.collection();
    let r = Keyboardkit.collection();

    searchForm.handle(req, {
        'empty': async (form) => {
            let products = await q.fetch({
                withRelated: ['category', 'types', 'subtypes', 'keyboardkits']
        })
        let kits = await r.fetch()
            res.render('products/productcatalog', {
                'products': products.toJSON(),
                'kits':kits.toJSON(),
                'form': form.toHTML(bootstrapField)
            })
        },
        'error': async (form) => {
            let products = await q.fetch({
                withRelated: ['category', 'types', 'subtypes', 'keyboardkits']
        })
        let kits = await r.fetch()
            res.render('products/selectcase', {
                'products': products.toJSON(),
                'kits':kits.toJSON(),
                'form': form.toHTML(bootstrapField)
            })
        },
        'success': async (form) => {
            
            if (form.data.name) {
                q = q.where('name', 'like', '%' + req.query.name + '%')
            }

            if (form.data.material) {
                q = q.where('material', 'like', '%' + req.query.material + '%')
            }

            if (form.data.brand) {
                q = q.where('brand', 'like', '%' + req.query.brand + '%')
            }

            if (form.data.type_id && form.data.type_id != "0") {
                q.where('type_id', '=', form.data.type_id)
            }

            if (form.data.subtype_id && form.data.subtype_id != "0") {
                q.where('subtype_id', '=', form.data.subtype_id)
            }

            if (form.data.category_id && form.data.category_id != "0") {
                q.where('category_id', '=', form.data.category_id)
            }

            if (form.data.keyboardkits) {
                q.query('join', 'keyboardkits_products', 'products.id', 'product_id')
                .where('keyboardkit_id', 'in', form.data.keyboardkits.split(','))
                }
                
            if (form.data.max_cost) {
                q = q.where('cost', '<=', req.query.max_cost);
            }

            let products = await q.fetch({
                withRelated: ['category', 'types', 'subtypes', 'keyboardkits']
            })
            let kits = await r.fetch()
                res.render('products/productcatalog', {
                    'products': products.toJSON(),
                    'kits':kits.toJSON(),
                    'form': form.toHTML(bootstrapField)
                })
                
        }
    })

})

// FILTER and display all Products for Customer
router.get('/allproducts', checkIfCustomerAuthenticated, async function(req,res){
    //get all categories
    const allCategories = await dataLayer.getAllCategories();
    //create a fake cat that represents search all
    allCategories.unshift([0,'All Layouts']);

    //get all Types
    const allTypes = await dataLayer.getAllTypes();
    //create a fake cat that represents search all
    allTypes.unshift([0,'All Keyboard Components']);

    //get all Subtypes
    const allSubtypes = await dataLayer.getAllSubtypes();
    //create a fake subtype that represents search all
    allSubtypes.unshift([0,'All Component Subtypes']);


    // get all Many-Many relationship kits
    const allKeyboardKits = await dataLayer.getAllKeyboardKits();
    

    //create search form
    let searchForm = createproductSearchForm(allCategories, allTypes, allSubtypes, allKeyboardKits);
    let q = Product.collection();

    searchForm.handle(req, {
        'empty': async (form) => {
            let products = await q.fetch({
                withRelated: ['category', 'types', 'subtypes', 'keyboardkits']
        })
            res.render('products/customerproductcatalog', {
                'products': products.toJSON(),
                'form': form.toHTML(bootstrapField)
            })
        },
        'error': async (form) => {
            let products = await q.fetch({
                withRelated: ['category', 'types', 'subtypes', 'keyboardkits']
        })
            res.render('products/customerproductcatalog', {
                'products': products.toJSON(),
                'form': form.toHTML(bootstrapField)
            })
        },
        'success': async (form) => {
            
            if (form.data.name) {
                q = q.where('name', 'like', '%' + req.query.name + '%')
            }

            if (form.data.material) {
                q = q.where('material', 'like', '%' + req.query.material + '%')
            }

            if (form.data.brand) {
                q = q.where('brand', 'like', '%' + req.query.brand + '%')
            }

            // if (form.data.category_id && form.data.category_id != "0"
            // ) {q = q.query('join', 'categories', 'category_id', 'categories.id')
            //     .where('categories.name', 'like', '%' + req.query.category + '%')
            // }
            if (form.data.type_id && form.data.type_id != "0") {
                q.where('type_id', '=', form.data.type_id)
            }

            if (form.data.subtype_id && form.data.subtype_id != "0") {
                q.where('subtype_id', '=', form.data.subtype_id)
            }

            if (form.data.category_id && form.data.category_id != "0") {
                q.where('category_id', '=', form.data.category_id)
            }

            if (form.data.keyboardkits) {
                q.query('join', 'keyboardkits_products', 'products.id', 'product_id')
                .where('keyboardkit_id', 'in', form.data.keyboardkits.split(','))
                }
                

            // if (form.data.min_cost) {
            //     q = q.where('cost', '>=', req.query.min_cost)
            // }

            if (form.data.max_cost) {
                q = q.where('cost', '<=', req.query.max_cost);
            }

            // if (form.data.keyboardpcb) {
            //     q.query('join', 'keyboardCase_keyboardPcb', 'keyboardcase.id', 'keyboardcase_id')
            //     .where('keyboardcase_id', 'in')
            // }

            let products = await q.fetch({
                withRelated: ['category', 'types', 'subtypes', 'keyboardkits']
            })
                res.render('products/customerproductcatalog', {
                    'products': products.toJSON(),
                    'form': form.toHTML(bootstrapField)
                })
                
        }
    })

})

// FILTER and display all Products for Public (nonlogin)
router.get('/allpublic', async function(req,res){
    //get all categories
    const allCategories = await dataLayer.getAllCategories();
    //create a fake cat that represents search all
    allCategories.unshift([0,'All Layouts']);

    //get all Types
    const allTypes = await dataLayer.getAllTypes();
    //create a fake cat that represents search all
    allTypes.unshift([0,'All Keyboard Components']);

    //get all Subtypes
    const allSubtypes = await dataLayer.getAllSubtypes();
    //create a fake subtype that represents search all
    allSubtypes.unshift([0,'All Component Subtypes']);


    // get all Many-Many relationship kits
    const allKeyboardKits = await dataLayer.getAllKeyboardKits();
    

    //create search form
    let searchForm = createproductSearchForm(allCategories, allTypes, allSubtypes, allKeyboardKits);
    let q = Product.collection();

    searchForm.handle(req, {
        'empty': async (form) => {
            let products = await q.fetch({
                withRelated: ['category', 'types', 'subtypes', 'keyboardkits']
        })
            res.render('products/publicproductcatalog', {
                'products': products.toJSON(),
                'form': form.toHTML(bootstrapField)
            })
        },
        'error': async (form) => {
            let products = await q.fetch({
                withRelated: ['category', 'types', 'subtypes', 'keyboardkits']
        })
            res.render('products/publicproductcatalog', {
                'products': products.toJSON(),
                'form': form.toHTML(bootstrapField)
            })
        },
        'success': async (form) => {
            
            if (form.data.name) {
                q = q.where('name', 'like', '%' + req.query.name + '%')
            }

            if (form.data.material) {
                q = q.where('material', 'like', '%' + req.query.material + '%')
            }

            if (form.data.brand) {
                q = q.where('brand', 'like', '%' + req.query.brand + '%')
            }

            // if (form.data.category_id && form.data.category_id != "0"
            // ) {q = q.query('join', 'categories', 'category_id', 'categories.id')
            //     .where('categories.name', 'like', '%' + req.query.category + '%')
            // }
            if (form.data.type_id && form.data.type_id != "0") {
                q.where('type_id', '=', form.data.type_id)
            }

            if (form.data.subtype_id && form.data.subtype_id != "0") {
                q.where('subtype_id', '=', form.data.subtype_id)
            }

            if (form.data.category_id && form.data.category_id != "0") {
                q.where('category_id', '=', form.data.category_id)
            }

            if (form.data.keyboardkits) {
                q.query('join', 'keyboardkits_products', 'products.id', 'product_id')
                .where('keyboardkit_id', 'in', form.data.keyboardkits.split(','))
                }
                

            // if (form.data.min_cost) {
            //     q = q.where('cost', '>=', req.query.min_cost)
            // }

            if (form.data.max_cost) {
                q = q.where('cost', '<=', req.query.max_cost);
            }

            // if (form.data.keyboardpcb) {
            //     q.query('join', 'keyboardCase_keyboardPcb', 'keyboardcase.id', 'keyboardcase_id')
            //     .where('keyboardcase_id', 'in')
            // }

            let products = await q.fetch({
                withRelated: ['category', 'types', 'subtypes', 'keyboardkits']
            })
                res.render('products/publicproductcatalog', {
                    'products': products.toJSON(),
                    'form': form.toHTML(bootstrapField)
                })
                
        }
    })

})


// FILTER Cases
router.get('/keyboardcases', async function(req,res){
    //get all categories
    const allCategories = await dataLayer.getAllCategories();
    //create a fake cat that represents search all
    allCategories.unshift([0,'----'])

    // get all pcb
    const allKeyboardPcb = await dataLayer.getAllKeyboardPcb();
    // console.log(allKeyboardPcb)
    // console.log(allCategories)

    //create search form
    let searchForm = createkeyboardCaseSearchForm(allCategories, allKeyboardPcb);
    let q = Keyboardcase.collection();

    searchForm.handle(req, {
        'empty': async (form) => {
            let keyboardcases = await q.fetch({
                withRelated: ['category']
        })
            res.render('products/selectcase', {
                'keyboardcases': keyboardcases.toJSON(),
                'form': form.toHTML(bootstrapField)
            })
        },
        'error': async (form) => {
            let keyboardcases = await q.fetch({
                withRelated: ['category']
        })
            res.render('products/selectcase', {
                'keyboardcases': keyboardcases.toJSON(),
                'form': form.toHTML(bootstrapField)
            })
        },
        'success': async (form) => {
            if (form.data.name) {
                q = q.where('name', 'like', '%' + req.query.name + '%')
            }

            if (form.data.material) {
                q = q.where('material', 'like', '%' + req.query.material + '%')
            }

            if (form.data.brand) {
                q = q.where('brand', 'like', '%' + req.query.brand + '%')
            }

            // if (form.data.category_id && form.data.category_id != "0"
            // ) {q = q.query('join', 'categories', 'category_id', 'categories.id')
            //     .where('categories.name', 'like', '%' + req.query.category + '%')
            // }
            if (form.data.category_id && form.data.category_id != "0") {
                q.where('category_id', '=', form.data.category_id)
            }

            // if (form.data.min_cost) {
            //     q = q.where('cost', '>=', req.query.min_cost)
            // }

            if (form.data.max_cost) {
                q = q.where('cost', '<=', req.query.max_cost);
            }

            // if (form.data.keyboardpcb) {
            //     q.query('join', 'keyboardCase_keyboardPcb', 'keyboardcase.id', 'keyboardcase_id')
            //     .where('keyboardcase_id', 'in')
            // }

            let keyboardcases = await q.fetch({
                withRelated: ['category']
            })
                res.render('products/selectcase', {
                    'keyboardcases': keyboardcases.toJSON(),
                    'form': form.toHTML(bootstrapField)
                })
                
        }
    })

})

// FILTER PCB
router.get('/keyboardpcbs', async function(req,res){
    //get all categories
    const allCategories = await dataLayer.getAllCategories();
    //create a fake cat that represents search all
    allCategories.unshift([0,'----'])

    // get all pcb
    const allKeyboardCase = await dataLayer.getAllKeyboardCase();

    const allConnectionType = await (await Keyboardpcb.fetchAll()).map(function(keyboardpcb){
        return[keyboardpcb.get('id'), keyboardpcb.get('switchConnectionType') ]
    })
    allConnectionType.unshift([0,'----'])


    //create search form
    let searchForm = createkeyboardPcbSearchForm(allCategories, allKeyboardCase, allConnectionType);
    let q = Keyboardpcb.collection();

    searchForm.handle(req, {
        'empty': async (form) => {
            let keyboardpcbs = await q.fetch({
                withRelated: ['category']
        })
            res.render('products/selectpcb', {
                'keyboardpcbs': keyboardpcbs.toJSON(),
                'form': form.toHTML(bootstrapField)
            })
        },
        'error': async (form) => {
            let keyboardpcbs = await q.fetch({
                withRelated: ['category']
        })
            res.render('products/selectpcb', {
                'keyboardpcbs': keyboardpcbs.toJSON(),
                'form': form.toHTML(bootstrapField)
            })
        },
        'success': async (form) => {
            if (form.data.name) {
                q = q.where('name', 'like', '%' + req.query.name + '%')
            }

            if (form.data.switchConnectionType) {
                q = q.where('switchConnectionType', 'like', '%' + req.query.switchConnectionType + '%')
            }

            if (form.data.brand) {
                q = q.where('brand', 'like', '%' + req.query.brand + '%')
            }

            if (form.data.category_id && form.data.category_id != "0") {
                q.where('category_id', '=', form.data.category_id)
            }

            if (form.data.max_cost) {
                q = q.where('cost', '<=', req.query.max_cost);
            }

            let keyboardpcbs = await q.fetch({
                withRelated: ['category']
            })
                res.render('products/selectpcb', {
                    'keyboardpcbs': keyboardpcbs.toJSON(),
                    'form': form.toHTML(bootstrapField)
                })
                
        }
    })

})


//Display keyboard products for Customer
router.get('/customer/catalog', async function(req,res){
    let keebCases = await Keyboardcase.collection().fetch({withRelated:['category']});
    let keebPcb = await Keyboardpcb.collection().fetch({withRelated:['category']});
    let keebPlate = await Keyboardplate.collection().fetch({withRelated:['category']});
    let keebSwitch = await Keyboardswitch.collection().fetch();
    let keebKeycap = await Keyboardkeycap.collection().fetch();
    let keebStabilizer = await Keyboardstabilizer.collection().fetch();

    res.render('products/customergallery',{
        'keyboardcases':keebCases.toJSON(),
        'keyboardpcb':keebPcb.toJSON(),
        'keyboardplate':keebPlate.toJSON(),
        'keyboardswitch':keebSwitch.toJSON(),
        'keyboardkeycap':keebKeycap.toJSON(),
        'keyboardstabilizer':keebStabilizer.toJSON()

    })

})



//////////////////////////////////CREATE///////////////////////////////////////////
// Create Keyboard Kit
router.get('/keyboardkit/create', checkIfAuthenticated, async (req, res) => {
    const kitForm = createkeyboardKitForm();

    res.render('products/createkit', {
        'kitform': kitForm.toHTML(bootstrapField)
        })
        
})


// post created Product
router.post('/keyboardkit/create', checkIfAuthenticated, async(req,res)=>{
    // const allKeyboardKits = await dataLayer.getAllKeyboardKits();
    const kitForm = createkeyboardKitForm();

    kitForm.handle(req, {
        'success': async (form) => {

            const keyboardkit = new Keyboardkit();
            keyboardkit.set('name', form.data.name);
            await keyboardkit.save();

            req.flash("success_messages", `New Keyboard Kit
            ${keyboardkit.get('name')} has been created`)

            
            
            res.redirect('/products/all');
        },
        'error': async (form) => {
            res.render('products/createkit', {
                'kitform': kitForm.toHTML(bootstrapField)
            })
        }
    })
})

// Create Product
router.get('/product/create', checkIfAuthenticated, async (req, res) => {
    const allCategories = await dataLayer.getAllCategories();
    const allTypes = await dataLayer.getAllTypes();
    const allSubTypes = await dataLayer.getAllSubtypes();
    const allKeyboardKits = await dataLayer.getAllKeyboardKits();
    const productForm = createproductForm(allCategories, allTypes, allSubTypes,allKeyboardKits);

    res.render('products/createproduct', {
        'form': productForm.toHTML(bootstrapField),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        })
        
})
// post created Product
router.post('/product/create', checkIfAuthenticated, async(req,res)=>{
    const allCategories = await dataLayer.getAllCategories();
    const allTypes = await dataLayer.getAllTypes();
    const allSubTypes = await dataLayer.getAllSubtypes();
    const allKeyboardKits = await dataLayer.getAllKeyboardKits();
    const productForm = createproductForm(allCategories, allTypes, allSubTypes, allKeyboardKits);
    productForm.handle(req, {
        'success': async (form) => {

            const product = new Product();
            product.set('name', form.data.name);
            product.set('brand', form.data.brand);
            product.set('material', form.data.material);
            product.set('category_id', form.data.category_id);
            product.set('type_id', form.data.type_id);
            product.set('subtype_id', form.data.subtype_id);
            product.set('keyboardKit', form.data.keyboardKit);
            product.set('quantity', form.data.quantity);
            product.set('cost', (parseFloat(form.data.cost)));
            product.set('description', form.data.description);
            
            product.set('image_url', form.data.image_url)
            await product.save();
             //check it user has selected compatible pcb
             
            if (form.data.keyboardkits) {
                await product.keyboardkits().attach(form.data.keyboardkits.split(','))
            }

            req.flash("success_messages", `New Product
            ${product.get('name')} has been created`)

            
            
            res.redirect('/products/all');
        },
        'error': async (form) => {
            res.render('products/createproduct', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

// Create keyboardCase
router.get('/keyboardcases/create', checkIfAuthenticated, async (req, res) => {
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const allKeyboardPcb = await (await Keyboardpcb.fetchAll()).map(function(keyboardpcb){
        return[keyboardpcb.get('id'), keyboardpcb.get('name') ]
    })
    const productForm = createkeyboardCaseForm(allCategories, allKeyboardPcb);

    res.render('products/createcase', {
        'form': productForm.toHTML(bootstrapField),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        })
        
})
// post created KeyboardCase
router.post('/keyboardcases/create', checkIfAuthenticated, async(req,res)=>{
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const allKeyboardPcb = await (await Keyboardpcb.fetchAll()).map(function(keyboardpcb){
        return[keyboardpcb.get('id'), keyboardpcb.get('name') ]
    })
    const productForm = createkeyboardCaseForm(allCategories, allKeyboardPcb);
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
            product.set('image_url', form.data.image_url)
            await product.save();
             //check it user has selected compatible pcb
             
            if (form.data.keyboardpcb) {
                await product.keyboardpcbs().attach(form.data.keyboardpcb.split(','))
            }

            req.flash("success_messages", `New Product
            ${product.get('name')} has been created`)

            
            
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
router.get('/keyboardpcb/create', checkIfAuthenticated, async (req, res) => {
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const allKeyboardCase = await (await Keyboardcase.fetchAll()).map(function(keyboardcase){
        return[keyboardcase.get('id'), keyboardcase.get('name') ]
    })
    const productForm = createkeyboardPcbForm(allCategories,allKeyboardCase);
    res.render('products/createpcb',{
    'form': productForm.toHTML(bootstrapField),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})
// post created pcb
router.post('/keyboardpcb/create', checkIfAuthenticated, async(req,res)=>{
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const allKeyboardCase = await (await Keyboardcase.fetchAll()).map(function(keyboardcase){
        return[keyboardcase.get('id'), keyboardcase.get('name') ]
    })
    const productForm = createkeyboardPcbForm(allCategories, allKeyboardCase);
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
            product.set('image_url', form.data.image_url);
            await product.save();
            if (form.data.keyboardcase) {
                await product.keyboardcases().attach(form.data.keyboardcase.split(','))
            }
            console.log(form.data.keyboardcase);
            res.redirect('/products/keyboardpcbs');
        },
        'error': async (form) => {
            res.render('products/createpcb', {
                'form': form.toHTML(bootstrapField)
            })
        }
    })
})

//create keyboard plate
router.get('/keyboardplate/create', checkIfAuthenticated, async (req, res) => {
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const productForm = createkeyboardPlateForm(allCategories);
    res.render('products/createplate',{
    'form': productForm.toHTML(bootstrapField),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

// post created plate
router.post('/keyboardplate/create', checkIfAuthenticated, async(req,res)=>{
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
            product.set('image_url', form.data.image_url);
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
router.get('/keyboardswitch/create', checkIfAuthenticated, async (req, res) => {
    const productForm = createkeyboardSwitchForm();
    res.render('products/createswitch',{
    'form': productForm.toHTML(bootstrapField),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

// post created switch
router.post('/keyboardswitch/create', checkIfAuthenticated, async(req,res)=>{
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
            product.set('image_url', form.data.image_url);
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
router.get('/keyboardkeycap/create', checkIfAuthenticated, async (req, res) => {
    const productForm = createkeyboardKeycapForm();
    res.render('products/createkeycap',{
    'form': productForm.toHTML(bootstrapField),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

// post created keycap
router.post('/keyboardkeycap/create', checkIfAuthenticated, async(req,res)=>{
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
            product.set('image_url', form.data.image_url);
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
router.get('/keyboardstabilizer/create', checkIfAuthenticated, async (req, res) => {
    const productForm = createkeyboardStabilizerForm();
    res.render('products/createstabilizer',{
    'form': productForm.toHTML(bootstrapField),
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

// post created stabilizer
router.post('/keyboardstabilizer/create', checkIfAuthenticated, async(req,res)=>{
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
            product.set('image_url', form.data.image_url);
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
//update Product by id
router.get('/product/:product_id/update', checkIfAuthenticated, async (req, res) => {
    // const allKeyboardPcb = await dataLayer.getAllKeyboardPcb();
    const allCategories = await dataLayer.getAllCategories();
    const allTypes = await dataLayer.getAllTypes();
    const allSubTypes = await dataLayer.getAllSubtypes();
    const allKeyboardKits = await dataLayer.getAllKeyboardKits();
    const productId = req.params.product_id;
    const product = await dataLayer.getProductById(productId);
    
    
    
        

        const productForm = createproductForm(allCategories, allTypes, allSubTypes, allKeyboardKits);
        
        productForm.fields.name.value = product.get('name');
        productForm.fields.brand.value = product.get('brand');
        productForm.fields.material.value = product.get('material');
        productForm.fields.category_id.value = product.get('category_id');
        productForm.fields.type_id.value = product.get('type_id');
        productForm.fields.subtype_id.value = product.get('subtype_id');
        // productForm.fields.keyboardKit.value = product.get('keyboardKit');
        productForm.fields.quantity.value = product.get('quantity');
        productForm.fields.cost.value = product.get('cost');
        productForm.fields.description.value = product.get('description');
        // 1 - set the image url in the product form
        productForm.fields.image_url.value = product.get('image_url');

        //fetch all related keyboard pcbs
        let selectedKeyboardkits = await product.related('keyboardkits').pluck('id');
        productForm.fields.keyboardkits.value = selectedKeyboardkits;

        res.render('products/updateproduct', {
            'form': productForm.toHTML(bootstrapField),
            'products':product.toJSON(),
            // 2 - send to the HBS file the cloudinary information
            cloudinaryName: process.env.CLOUDINARY_NAME,
            cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
            cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        })
})

//process update of Product
router.post('/product/:product_id/update', checkIfAuthenticated, async (req, res) => {
    const allCategories = await dataLayer.getAllCategories();
    const allTypes = await dataLayer.getAllTypes();
    const allSubTypes = await dataLayer.getAllSubtypes();
    const allKeyboardKits = await dataLayer.getAllKeyboardKits();

    // fetch the product that we want to update
    const product = await Product.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createproductForm(allCategories, allTypes, allSubTypes, allKeyboardKits);
        productForm.handle(req,{
            'success': async (form)=>{
                let {keyboardkits, ...productData} = form.data;
                product.set(productData);
                await product.save();

            
                //update the relationship
                let keyboardkitIds= keyboardkits.split(',')
                //get all kit ids selected
                let existingkeyboardkitIds = await product.related('keyboardkits').pluck('id')
                           
                //remove pcbs not selected anymore
                let toRemove = id=> keyboardkitIds.includes(id) === false;
                await product.keyboardkits().detach(toRemove);
                // await keebCases.keyboardpcbs().detach(id=>keyboardpcbIds.includes(id) === false);
                //add in pcbs that are selected
                await product.keyboardkits().attach(keyboardkitIds);



                
                res.redirect('/products/keyboardcases');
            },
            'error':async (form) =>{
                res.render('products/updateproduct',{
                    'form': form.toHTML(bootstrapField),
                    'products': product.toJSON()
                })
            }
        })
    
})

//update KeyboardKit by id
router.get('/keyboardkit/:product_id/update', checkIfAuthenticated, async (req, res) => {
    const kitId = req.params.product_id;
    console.log(req.params.product_id)
    const keebKit = await dataLayer.getKeyboardKitById(kitId);

        const kitForm = createkeyboardKitForm();
        
        kitForm.fields.name.value = keebKit.get('name');


        res.render('products/updatekit', {
            'kitform': kitForm.toHTML(bootstrapField),
            'keyboardkits':keebKit.toJSON()
        })

})
//process update of KeyboardKit
router.post('/keyboardkit/:product_id/update', checkIfAuthenticated, async (req, res) => {
    // fetch the product that we want to update
    const keebKit = await Keyboardkit.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const kitForm = createkeyboardKitForm();
    kitForm.handle(req,{
        'success': async (kitform)=>{
            keebKit.set(kitform.data);
            keebKit.save();
            res.redirect('/products/all');
        },
        'error':async (kitform) =>{
            res.render('products/updatekit',{
                'kitform': kitForm.toHTML(bootstrapField),
                'keyboardkits':keebKit.toJSON()
            })
        }
    })
    
})

/////////////////////////////////////////////////////////////////////////////

//update KeyboardCase by id
router.get('/keyboardcase/:product_id/update', checkIfAuthenticated, async (req, res) => {
    const allKeyboardPcb = await dataLayer.getAllKeyboardPcb();
    const allCategories = await dataLayer.getAllCategories();
    const productId = req.params.product_id;
    const keebCases = await dataLayer.getKeyboardCaseById(productId);
        

        const productForm = createkeyboardCaseForm(allCategories, allKeyboardPcb);
        
        productForm.fields.name.value = keebCases.get('name');
        productForm.fields.brand.value = keebCases.get('brand');
        productForm.fields.material.value = keebCases.get('material');
        productForm.fields.category_id.value = keebCases.get('category_id');
        productForm.fields.keyboardKit.value = keebCases.get('keyboardKit');
        productForm.fields.quantity.value = keebCases.get('quantity');
        productForm.fields.cost.value = keebCases.get('cost');
        productForm.fields.description.value = keebCases.get('description');
        // 1 - set the image url in the product form
        productForm.fields.image_url.value = keebCases.get('image_url');

        //fetch all related keyboard pcbs
        let selectedKeyboardpcbs = await keebCases.related('keyboardpcbs').pluck('id');
        productForm.fields.keyboardpcb.value = selectedKeyboardpcbs;

        res.render('products/updatecase', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardcases':keebCases.toJSON(),
            // 2 - send to the HBS file the cloudinary information
            cloudinaryName: process.env.CLOUDINARY_NAME,
            cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
            cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        })
})
//process update of KeyboardCase
router.post('/keyboardcase/:product_id/update', checkIfAuthenticated, async (req, res) => {
    const allCategories = await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })
    const allKeyboardPcb = await (await Keyboardpcb.fetchAll()).map(function(keyboardpcb){
        return[keyboardpcb.get('id'), keyboardpcb.get('name') ]
    })
    // fetch the product that we want to update
    const keebCases = await Keyboardcase.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    })
    //process form
    const productForm = createkeyboardCaseForm(allCategories, allKeyboardPcb);
    productForm.handle(req,{
        'success': async (form)=>{
            let {keyboardpcb, ...keebCasesData} = form.data;
            keebCases.set(keebCasesData);
            await keebCases.save();

        
            //update the relationship
            let keyboardpcbIds= keyboardpcb.split(',')
            //get all pcbs selected
            let existingkeyboardpcbIds = await keebCases.related('keyboardpcbs').pluck('id')
            
            
            //remove pcbs not selected anymore
            let toRemove = id=> keyboardpcbIds.includes(id) === false;
            await keebCases.keyboardpcbs().detach(toRemove);
            // await keebCases.keyboardpcbs().detach(id=>keyboardpcbIds.includes(id) === false);
            //add in pcbs that are selected
            await keebCases.keyboardpcbs().attach(keyboardpcbIds);



            
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
router.get('/keyboardpcb/:product_id/update', checkIfAuthenticated, async (req, res) => {
    const allKeyboardCase = await dataLayer.getAllKeyboardCase();
    const allCategories = await dataLayer.getAllCategories();
    const productId = req.params.product_id;
    const keebPcb = await dataLayer.getKeyboardPcbById(productId);

        const productForm = createkeyboardPcbForm(allCategories, allKeyboardCase);
        
        productForm.fields.name.value = keebPcb.get('name');
        productForm.fields.brand.value = keebPcb.get('brand');
        productForm.fields.switchConnectionType.value = keebPcb.get('switchConnectionType');
        productForm.fields.category_id.value = keebPcb.get('category_id');
        productForm.fields.keyboardKit.value = keebPcb.get('keyboardKit');
        productForm.fields.quantity.value = keebPcb.get('quantity');
        productForm.fields.cost.value = keebPcb.get('cost');
        productForm.fields.description.value = keebPcb.get('description');
        // 1 - set the image url in the product form
        productForm.fields.image_url.value = keebPcb.get('image_url');

        //fetch all related keyboard cases
        let selectedKeyboardcases = await keebPcb.related('keyboardcases').pluck('id');
        productForm.fields.keyboardcase.value = selectedKeyboardcases;

        res.render('products/updatepcb', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardpcb':keebPcb.toJSON(),
            // 2 - send to the HBS file the cloudinary information
            cloudinaryName: process.env.CLOUDINARY_NAME,
            cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
            cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        })

})
//process update of KeyboardPcb
router.post('/keyboardpcb/:product_id/update', checkIfAuthenticated, async (req, res) => {
    const allKeyboardCase = await (await Keyboardcase.fetchAll()).map(function(keyboardcase){
        return[keyboardcase.get('id'), keyboardcase.get('name') ]
    })
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
    const productForm = createkeyboardPcbForm(allCategories, allKeyboardCase);
    productForm.handle(req,{
        'success': async (form)=>{
            let {keyboardcase, ...keebPcbsData} = form.data;
            keebPcb.set(keebPcbsData);
            await keebPcb.save();


            //update the relationship
            let keyboardcaseIds= keyboardcase.split(',')
            //get all pcbs selected
            let existingkeyboardcaseIds = await keebPcb.related('keyboardcases').pluck('id')
            
            
            //remove pcbs not selected anymore
            let toRemove = id=> keyboardcaseIds.includes(id) === false;
            await keebPcb.keyboardcases().detach(toRemove);
            
            //add in pcbs that are selected
            await keebPcb.keyboardcases().attach(keyboardcaseIds);



            res.redirect('/products/keyboardpcbs');
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
router.get('/keyboardplate/:product_id/update', checkIfAuthenticated, async (req, res) => {
    const allCategories = await dataLayer.getAllCategories();
    
    const productId = req.params.product_id;
    const keebPlate = await dataLayer.getKeyboardPlateById(productId);

        const productForm = createkeyboardPlateForm(allCategories);
        
        productForm.fields.name.value = keebPlate.get('name');
        productForm.fields.brand.value = keebPlate.get('brand');
        productForm.fields.plateMaterial.value = keebPlate.get('plateMaterial');
        productForm.fields.category_id.value = keebPlate.get('category_id');
        productForm.fields.keyboardKit.value = keebPlate.get('keyboardKit');
        productForm.fields.quantity.value = keebPlate.get('quantity');
        productForm.fields.cost.value = keebPlate.get('cost');
        productForm.fields.description.value = keebPlate.get('description');
        // 1 - set the image url in the product form
        productForm.fields.image_url.value = keebPlate.get('image_url');

        res.render('products/updateplate', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardplate':keebPlate.toJSON(),
            // 2 - send to the HBS file the cloudinary information
            cloudinaryName: process.env.CLOUDINARY_NAME,
            cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
            cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        })

})

//process update of KeyboardPlate
router.post('/keyboardplate/:product_id/update', checkIfAuthenticated, async (req, res) => {
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
router.get('/keyboardswitch/:product_id/update', checkIfAuthenticated, async (req, res) => {
    const productId = req.params.product_id;
    const keebSwitch = await dataLayer.getKeyboardSwitchById(productId);

        const productForm = createkeyboardSwitchForm();
        
        productForm.fields.name.value = keebSwitch.get('name');
        productForm.fields.brand.value = keebSwitch.get('brand');
        productForm.fields.switchType.value = keebSwitch.get('switchType');
        productForm.fields.switchConnectionType.value = keebSwitch.get('switchConnectionType');
        productForm.fields.quantity.value = keebSwitch.get('quantity');
        productForm.fields.cost.value = keebSwitch.get('cost');
        productForm.fields.description.value = keebSwitch.get('description');
        // 1 - set the image url in the product form
        productForm.fields.image_url.value = keebSwitch.get('image_url');


        res.render('products/updateswitch', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardswitch':keebSwitch.toJSON(),
            // 2 - send to the HBS file the cloudinary information
            cloudinaryName: process.env.CLOUDINARY_NAME,
            cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
            cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        })

})

//process update of KeyboardSwitch
router.post('/keyboardswitch/:product_id/update', checkIfAuthenticated, async (req, res) => {
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
router.get('/keyboardkeycap/:product_id/update', checkIfAuthenticated, async (req, res) => {
    const productId = req.params.product_id;
    const keebKeycap = await dataLayer.getKeyboardKeycapById(productId);

        const productForm = createkeyboardKeycapForm();
        
        productForm.fields.name.value = keebKeycap.get('name');
        productForm.fields.brand.value = keebKeycap.get('brand');
        productForm.fields.size.value = keebKeycap.get('size');
        productForm.fields.keycapMaterial.value = keebKeycap.get('keycapMaterial');
        productForm.fields.keycapProfile.value = keebKeycap.get('keycapProfile');
        productForm.fields.quantity.value = keebKeycap.get('quantity');
        productForm.fields.cost.value = keebKeycap.get('cost');
        productForm.fields.description.value = keebKeycap.get('description');
        // 1 - set the image url in the product form
        productForm.fields.image_url.value = keebKeycap.get('image_url');

        res.render('products/updatekeycap', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardkeycap':keebKeycap.toJSON(),
            // 2 - send to the HBS file the cloudinary information
            cloudinaryName: process.env.CLOUDINARY_NAME,
            cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
            cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        })

})

//process update of KeyboardKeycap
router.post('/keyboardkeycap/:product_id/update', checkIfAuthenticated, async (req, res) => {
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
router.get('/keyboardstabilizer/:product_id/update', checkIfAuthenticated, async (req, res) => {
    const productId = req.params.product_id;
    const keebStabilizer = await dataLayer.getKeyboardStabilizerById(productId);

        const productForm = createkeyboardStabilizerForm();
        
        productForm.fields.name.value = keebStabilizer.get('name');
        productForm.fields.brand.value = keebStabilizer.get('brand');
        productForm.fields.stabilizerType.value = keebStabilizer.get('stabilizerType');
        productForm.fields.quantity.value = keebStabilizer.get('quantity');
        productForm.fields.cost.value = keebStabilizer.get('cost');
        productForm.fields.description.value = keebStabilizer.get('description');
        // 1 - set the image url in the product form
        productForm.fields.image_url.value = keebStabilizer.get('image_url');

        res.render('products/updatestabilizer', {
            'form': productForm.toHTML(bootstrapField),
            'keyboardstabilizer':keebStabilizer.toJSON(),
            // 2 - send to the HBS file the cloudinary information
            cloudinaryName: process.env.CLOUDINARY_NAME,
            cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
            cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
        })

})

//process update of KeyboardStabilizer
router.post('/keyboardstabilizer/:product_id/update', checkIfAuthenticated, async (req, res) => {
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
//Delete product
router.get('/product/:product_id/delete', checkIfAuthenticated, async (req, res) => {
    const productId = req.params.product_id;
    const product = await Product.where({
        'id': productId}).fetch({
            require: true
        });

        res.render('products/deleteproduct', {
            'products':product.toJSON()
        })
})
//process delete product
router.post('/product/:product_id/delete', checkIfAuthenticated, async (req, res) => {
    const productId = req.params.product_id;
    const product = await Product.where({
        'id': productId}).fetch({
            require: true
        });

    await product.destroy();
    res.redirect('/products/keyboardcases')
})




//Delete keyboardKit
router.get('/keyboardkit/:product_id/delete', checkIfAuthenticated, async (req, res) => {
    const kitId = req.params.product_id;
    const keebKit = await Keyboardkit.where({
        'id': kitId
    }).fetch({
        require: true
    })
        res.render('products/deletekit', {
            'keyboardkits':keebKit.toJSON()
        })
})

//process delete keyboard Kit
router.post('/keyboardkit/:product_id/delete', checkIfAuthenticated, async (req, res) => {
    const kitId = req.params.product_id;
    const keebKit = await Keyboardkit.where({
        'id': kitId
    }).fetch({
        require: true
    })
    await keebKit.destroy();
    res.redirect('/products/all')
})


//Delete keyboardCase
router.get('/keyboardcase/:product_id/delete', checkIfAuthenticated, async (req, res) => {
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
router.post('/keyboardcase/:product_id/delete', checkIfAuthenticated, async (req, res) => {
    const keebCases = await Keyboardcase.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebCases.destroy();
    res.redirect('/products/catalog')
})

//Delete keyboardPcb
router.get('/keyboardpcb/:product_id/delete', checkIfAuthenticated, async (req, res) => {
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
router.post('/keyboardpcb/:product_id/delete', checkIfAuthenticated, async (req, res) => {
    const keebPcb = await Keyboardpcb.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebPcb.destroy();
    res.redirect('/products/catalog')
})

//Delete keyboardPlate
router.get('/keyboardplate/:product_id/delete', checkIfAuthenticated, async (req, res) => {
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
router.post('/keyboardplate/:product_id/delete', checkIfAuthenticated, async (req, res) => {
    const keebPlate = await Keyboardplate.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebPlate.destroy();
    res.redirect('/products/catalog')
})

//Delete keyboardSwitch
router.get('/keyboardswitch/:product_id/delete', checkIfAuthenticated, async (req, res) => {
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
router.post('/keyboardswitch/:product_id/delete', checkIfAuthenticated, async (req, res) => {
    const keebSwitch = await Keyboardswitch.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebSwitch.destroy();
    res.redirect('/products/catalog')
})

//Delete keyboardKeycap
router.get('/keyboardkeycap/:product_id/delete', checkIfAuthenticated, async (req, res) => {
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
router.post('/keyboardkeycap/:product_id/delete', checkIfAuthenticated, async (req, res) => {
    const keebKeycap = await Keyboardkeycap.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebKeycap.destroy();
    res.redirect('/products/catalog')
})

//Delete keyboardStabilizer
router.get('/keyboardstabilizer/:product_id/delete', checkIfAuthenticated, async (req, res) => {
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
router.post('/keyboardstabilizer/:product_id/delete', checkIfAuthenticated, async (req, res) => {
    const keebStabilizer = await Keyboardstabilizer.where({
        'id': req.params.product_id
    }).fetch({
        require: true
    });
    await keebStabilizer.destroy();
    res.redirect('/products/catalog')
})







module.exports = router;