//Cart
const { CartItem } = require('../models');


async function getCartItemByUserAndProduct(customerId, productId){
    let cartItem = await CartItem.where({
        'customer_id': customerId,
        'product_id': productId
    }).fetch({
        'require': false
    })
    return cartItem;
}

async function createCartItem(customerId, productId, quantity) {

    let cartItem = new CartItem({
        'customer_id': customerId,
        'product_id': productId,
        'quantity': quantity
    })
    await cartItem.save();
    return cartItem;
}
/////////
// async function getAllCartItem(customerId) {
//     // to get more > 1 result, .collection
//     let allCartItems = await CartItem.collection()
//         .where({
//             'customer_id': customerId
//         }).fetch({
//             'require': false,
//             withRelated:['customer']
//         })
//     return allCartItems;
// }

async function getCart(customerId) {
    // to get more > 1 result, .collection
    let allCartItems = await CartItem.collection()
        .where({
            'customer_id': customerId
        }).fetch({
            'require': false,
            withRelated:['product', 'product.types', 'customer']
        })
    return allCartItems;
}

async function removeFromCart(customerId, productId) {
    let cartItem = await getCartItemByUserAndProduct(customerId, productId);
    if (cartItem) {
        await cartItem.destroy();
        return true;
    }
    return false;
}

async function updateQuantity(userId, productId, newQuantity) {
    let cartItem = await getCartItemByUserAndProduct(userId, productId);
    if (cartItem) {
        cartItem.set('quantity', newQuantity);
        cartItem.save();
        return true;
    }
    return false;
}

const getAllCartItem = async ()=>{
    return await (await CartItem.collection()
    .fetch({
        'require': false,
        withRelated:['product', 'product.types', 'customer']
    })
    ).map(function(customer){
        return({ id: customer.get('id'), customer_id: customer.get('customer_id'), product_id: customer.get('product_id'), quantity: customer.get('quantity'),
        username: customer.related('customer').get('username'), email: customer.related('customer').get('email'),contact: customer.related('customer').get('contact'), address: customer.related('customer').get('address')  })
    })

}










// const getAllCartItem = async ()=>{
//     return await (await CartItem.fetchAll()).map(function(customer){
//         return[customer.get('id'),customer.get('customer_id'), customer.get('product_id'), customer.get('quantity') ]
//     })

// }
module.exports = {
    createCartItem, getCartItemByUserAndProduct, getCart, removeFromCart, updateQuantity, getAllCartItem
} 