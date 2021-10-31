const bookshelf = require('../bookshelf')

const Keyboardcase = bookshelf.model('Keyboardcase', {
tableName:'keyboardCase'
});
module.exports = {
    'Keyboardcase':Keyboardcase
}