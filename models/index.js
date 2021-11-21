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











module.exports = {
    'Keyboardcase':Keyboardcase,
    'Keyboardpcb':Keyboardpcb,
    'Keyboardplate':Keyboardplate,
    'Keyboardswitch': Keyboardswitch,
    'Keyboardkeycap': Keyboardkeycap,
    'Keyboardstabilizer': Keyboardstabilizer,
    'Category': Category
}