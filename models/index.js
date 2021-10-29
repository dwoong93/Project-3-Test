const bookshelf = require('../bookshelf')
const Product = bookshelf.model('keyboard', {
tableName:'keyboardCase'
});
module.exports = {Product};