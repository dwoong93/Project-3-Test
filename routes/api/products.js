const express = require('express')
const router = express.Router();
const productDataLayer = require('../../dal/products')
const { Product } = require('../../models');
const { createproductForm } = require('../../forms');


router.get('/', async(req,res)=>{
    res.send(await productDataLayer.getAllProducts())
    })



// Create Product
router.post('/', async(req,res)=>{
  const allCategories = await productDataLayer.getAllCategories();
  const allTypes = await productDataLayer.getAllTypes();
  const allSubTypes = await productDataLayer.getAllSubtypes();
  const allKeyboardKits = await productDataLayer.getAllKeyboardKits();
  const productForm = createproductForm(allCategories, allTypes, allSubTypes, allKeyboardKits);
  productForm.handle(req, {
      'success': async (form) => {

        let {categories, alltypes, allsubtypes, keyboardkits, ...productData} = form.data;
        const product = new Product(productData);
        await product.save();

        if (categories, alltypes, allsubtypes, keyboardkits) {
          await product.categories().attach(categories.split(",")),
          await product.alltypes().attach(alltypes.split(",")),
          await product.allsubtypes().attach(allsubtypes.split(","))
          await product.keyboardKit().attach(keyboardkits.split(","))
        }
        res.send(product)
          
      },
      'error': async (form) => {
        let errors ={}
        for(let key in form.fields){
          if(form.fields[key].error){
            errors[key] = form.fields[key].error
          }
          
        }
        res.send((errors));
      }
      
  })
})
















  module.exports=router;