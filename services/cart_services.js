const cartDataLayer = require('../dal/cart_items')

class CartServices {
    constructor(customer_id) {
        this.customer_id = customer_id;
    }
    async addToCart(productId, quantity) {
        // check if user has added the product to the shopping cart before
        let cartItem = await cartDataLayer.getCartItemByCustomerAndProduct(this.customer_id,productId);
    
        if (cartItem) {
            return await cartDataLayer.updateQuantity(this.customer_id, productId, cartItem.get('quantity') +1);
        } else {
            let newCartItem = cartDataLayer.createCartItem(this.customer_id, productId, quantity);
            return newCartItem;
        }
    }
       
    async remove(productId) {
        return await cartDataLayer.removeFromCart(this.customer_id, productId);
    }
    
    async setQuantity(productId, quantity) {
        return await cartDataLayer.updateQuantity(this.customer_id, productId, quantity);
    }

    async getCart() {
        return await cartDataLayer.getCart(this.customer_id);
    }
}


module.exports = CartServices;
