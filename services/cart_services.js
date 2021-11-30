const cartDataLayer = require('../dal/cart_items')
class CartServices {
    constructor(customer_id) {
        this.customer_id = customer_id;
    }
}


module.exports = CartServices;
