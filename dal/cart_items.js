//Cart
const { CartItem } = require('../models');


//get the items of a user's shopping cart
const getCart = async (customerId) => {
    return await CartItem.collection()
    .where({
    'customer_id': customerId
    }).fetch({
    require: false,
    withRelated: ['product', 'product.category']
});

        
}

//check if a specific product exists in a user's shopping cart.If it does, it will return the cart item
const getCartItemByCustomerAndProduct = async (userId, productId) => {
    return await CartItem.where({
        'user_id': userId,
        'product_id': productId
    }).fetch({
        require: false,
        withRelated: ['keyboardcase', 'keyboardcase.category',
                    'keyboardpcb', 'keyboardpcb.category',
                    'keyboardplate', 'keyboardplate.category',
                    'keyboardstabilizer', 'keyboardcase.switch',
                    'keyboardkeycap']
    });
}
 
//create cart item
async function createCartItem(userId, productId, quantity) {
    let cartItem = new CartItem({
    'user_id': userId,
    'product_id': productId,
    'quantity': quantity
    })
    await cartItem.save();
    return cartItem;
    }

//remove cart item
async function removeFromCart(userId, productId) {
    let cartItem = await getCartItemByCustomerAndProduct(userId, productId);
    if (cartItem) {
        await cartItem.destroy();
        return true;
    }
    return false;
}

//update quantity of a given cart item
async function updateQuantity(userId, productId, newQuantity) {
    let cartItem = await getCartItemByCustomerAndProduct(userId, productId);
    if (cartItem) {
        cartItem.set('quantity', newQuantity);
        cartItem.save();
        return true;
    }
    return false;
    }




    module.exports = {
        getCart, getCartItemByCustomerAndProduct,
        createCartItem, removeFromCart, updateQuantity
        }