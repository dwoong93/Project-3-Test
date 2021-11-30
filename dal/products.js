// #1 import in the Product model
const {Keyboardcase, Keyboardpcb, Keyboardplate, Keyboardswitch, Keyboardkeycap, Keyboardstabilizer, Category} = require('../models')

const getAllCategories = async ()=>{
    return await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })

}


const getAllKeyboardPcb = async ()=>{
    return await (await Keyboardpcb.fetchAll()).map(function(keyboardpcb){
        return[keyboardpcb.get('id'), keyboardpcb.get('name') ]
    })

}

const getAllKeyboardCase = async ()=>{
    return await (await Keyboardcase.fetchAll()).map(function(keyboardcase){
        return[keyboardcase.get('id'), keyboardcase.get('name') ]
    })

}

//keebcases
const getKeyboardCaseById = async(productId) => {
    return await Keyboardcase.where({
        'id': productId}).fetch({
            require: true,
            'withRelated': ['keyboardpcbs']
        });

} 



//keebpcb
const getKeyboardPcbById = async(productId) => {
    return await Keyboardpcb.where({
        'id': productId}).fetch({
            require: true,
            'withRelated': ['keyboardcases']
        });
    
} 

//keebplate
const getKeyboardPlateById = async(productId) => {
    return await Keyboardplate.where({
        'id': productId}).fetch({
            require: true
        });
    
} 

//keebStab
const getKeyboardStabilizerById = async(productId) => {
    return await Keyboardstabilizer.where({
        'id': productId}).fetch({
            require: true
        });
    
} 

//keebSwitch
const getKeyboardSwitchById = async(productId) => {
    return await Keyboardswitch.where({
        'id': productId}).fetch({
            require: true
        });
    
} 



//keebCap
const getKeyboardKeycapById = async(productId) => {
    return await Keyboardkeycap.where({
        'id': productId}).fetch({
            require: true
        });
    
}

//Cart
const { CartItem } = require('../models');


//get the items of a user's shopping cart
const getCart = async (customerId) => {
    return await CartItem.collection()
    .where({
    'customer_id': customerId
    }).fetch({
    require: false,
        withRelated: ['keyboardcase', 'keyboardcase.category',
                    'keyboardpcb', 'keyboardpcb.category',
                    'keyboardplate', 'keyboardplate.category',
                    'keyboardstabilizer', 'keyboardcase.switch',
                    'keyboardkeycap']
        });
}

//check if a specific product exists in a user's shopping cart.If it does, it will return the cart item
const getCartItemByCustomerAndProduct = async (customerId, productId) => {
    return await CartItem.where({
        'customer_id': customerId,
        'product_id': productId
    }).fetch({
        require: false
    });
}
 
//create cart item
async function createCartItem(customerId, productId, quantity) {
    let cartItem = new CartItem({
    'customer_id': userId,
    'product_id': productId,
    'quantity': quantity
    })
    await cartItem.save();
    return cartItem;
    }

//remove cart item
async function removeFromCart(customerId, productId) {
    let cartItem = await getCartItemByCustomerAndProduct(customerId, productId);
    if (cartItem) {
        await cartItem.destroy();
        return true;
    }
    return false;
}

//update quantity of a given cart item
async function updateQuantity(customerId, productId, newQuantity) {
    let cartItem = await getCartItemByCustomerAndProduct(customerId, productId);
    if (cartItem) {
        cartItem.set('quantity', newQuantity);
        cartItem.save();
        return true;
    }
    return false;
    }
    
























module.exports = {
    getAllCategories, getAllKeyboardCase, getAllKeyboardPcb, getKeyboardCaseById, 
    getKeyboardPcbById, getKeyboardPlateById, getKeyboardStabilizerById, 
    getKeyboardSwitchById, getKeyboardKeycapById, getCart, getCartItemByCustomerAndProduct,
    createCartItem,
    }