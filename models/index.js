const bookshelf = require('../bookshelf')

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
    tableName: 'cart_items',
        keyboardcase() {
            return this.belongsTo('Keyboardcase')
        },
        keyboardpcb() {
            return this.belongsTo('Keyboardpcb')
        },
        keyboardplate() {
            return this.belongsTo('Keyboardplate')
        },
        keyboardstabilizer() {
            return this.belongsTo('Keyboardstabilizer')
        },
        keyboardswitch() {
            return this.belongsTo('Keyboardswitch')
        },
        keyboardkeycap() {
            return this.belongsTo('Keyboardkeycap')
        }
})











module.exports = {
    'Keyboardcase':Keyboardcase,
    'Keyboardpcb':Keyboardpcb,
    'Keyboardplate':Keyboardplate,
    'Keyboardswitch': Keyboardswitch,
    'Keyboardkeycap': Keyboardkeycap,
    'Keyboardstabilizer': Keyboardstabilizer,
    'Category': Category,
    'User': User,
    'Customer': Customer,
    'Cartitem':CartItem
}