const bookshelf = require('../bookshelf')
const keyboardCase = bookshelf.model('keyboardCase', {
tableName:'keyboardCase'
});
module.exports = { keyboardCase };