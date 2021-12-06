const bookshelf = require('../bookshelf')

const Product = bookshelf.model('Product', {
    tableName:'products',
    category(){
        return this.belongsTo('Category')
    },
    types(){//if runs into error, try type
        return this.belongsTo('Types')
    },
    subtypes(){//if runs into error, try subtype
        return this.belongsTo('Subtypes')
    },
    keyboardkits(){
        return this.belongsToMany('Keyboardkit')
    }
    });

const Types = bookshelf.model('Types', {
    tableName:'types',
    products(){
        return this.hasMany('Product')
    },
    });

const Subtypes = bookshelf.model('Subtypes', {
    tableName:'subtypes',
    products(){
        return this.hasMany('Product')
    },
    });

const Keyboardkit = bookshelf.model('Keyboardkit', {
    tableName:'keyboardkits',
    products(){
        return this.belongsToMany('Product')
    }
    });

const Category = bookshelf.model('Category', {
    tableName:'categories',
    keyboardcases(){
        return this.hasMany('Keyboardcase')
    },
    keyboardpcbs(){
        return this.hasMany('Keyboardpcb')
    },
    keyboardplates(){
        return this.hasMany('Keyboardplate')
    },
    });
const User = bookshelf.model('User',{
    tableName: 'users'
    });
const Customer = bookshelf.model('Customer',{
    tableName: 'customers'
    })

const CartItem = bookshelf.model('CartItem', {
    'tableName': 'cart_items',
    product() {
        return this.belongsTo('Product')
    },
    customer() {
        return this.belongsTo('Customer')
    }

})



//to be unused 
const Keyboardcase = bookshelf.model('Keyboardcase', {
    tableName:'keyboardCase',
    category(){
        return this.belongsTo('Category')
    },
    keyboardpcbs(){
        return this.belongsToMany('Keyboardpcb')
    }
    });

const Keyboardpcb = bookshelf.model('Keyboardpcb', {
    tableName:'keyboardPcb',
    category(){
        return this.belongsTo('Category')
    },
    keyboardcases(){
        return this.belongsToMany('Keyboardcase')
    }
    });

const Keyboardplate = bookshelf.model('Keyboardplate', {
    tableName:'keyboardPlate',
    category(){
        return this.belongsTo('Category')
    }
    });

const Keyboardswitch = bookshelf.model('Keyboardswitch', {
    tableName:'keyboardSwitch'
    });
const Keyboardkeycap = bookshelf.model('Keyboardkeycap', {
    tableName:'keyboardKeycap'
    });
const Keyboardstabilizer = bookshelf.model('Keyboardstabilizer', {
    tableName:'keyboardStabilizer'
    });












module.exports = {
    'Product':Product,
    'Types':Types,
    'Subtypes':Subtypes,
    'Keyboardkit': Keyboardkit,
    'Keyboardcase':Keyboardcase,
    'Keyboardpcb':Keyboardpcb,
    'Keyboardplate':Keyboardplate,
    'Keyboardswitch': Keyboardswitch,
    'Keyboardkeycap': Keyboardkeycap,
    'Keyboardstabilizer': Keyboardstabilizer,
    'Category': Category,
    'User': User,
    'Customer': Customer,
    'CartItem':CartItem
}