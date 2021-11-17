const bookshelf = require('../bookshelf')

const Keyboardcase = bookshelf.model('Keyboardcase', {
tableName:'keyboardCase'
});

const Keyboardpcb = bookshelf.model('Keyboardpcb', {
    tableName:'keyboardPcb'
    });

const Keyboardplate = bookshelf.model('Keyboardplate', {
    tableName:'keyboardPlate'
    });

const Keyboardswitch = bookshelf.model('Keyboardswitch', {
    tableName:'keyboardSwitch'
    });
const Keyboardkeycap = bookshelf.model('Keyboardkeycap', {
    tableName:'keyboardKeycap'
    });











module.exports = {
    'Keyboardcase':Keyboardcase,
    'Keyboardpcb':Keyboardpcb,
    'Keyboardplate':Keyboardplate,
    'Keyboardswitch': Keyboardswitch,
    'Keyboardkeycap': Keyboardkeycap
}