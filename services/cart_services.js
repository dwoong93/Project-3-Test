const {createCartItem, getCartItemByCustomerAndProduct, removeFromCart, updateQuantity, getCart, getCartItemByUserAndProduct} = require('../dal/cartItems');
const {CartItem}=require('../models')

class CartServices {
    constructor(customer_id) {
        this.customer_id= customer_id;
    }

    async addToCart(productId, quantity) {
        // check if uuser has added the product to the shopping cart before
        let cartItem = await getCartItemByUserAndProduct(this.customer_id, productId);

        if (cartItem) {
            cartItem.set('quantity', cartItem.get('quantity') + 1);
            cartItem.save();
            return cartItem;
        } else {
            let newCartItem = createCartItem(this.customer_id, productId, quantity);
            return newCartItem;
        }
    }

    async removeFromCart(productId) {
        return await removeFromCart(this.customer_id, productId);
    }

    async updateQuantity(productId, quantity) {
        return await updateQuantity(this.customer_id, productId, quantity);
    }

    async getCart() {
        return await getCart(this.customer_id);
    }
}


module.exports= CartServices
