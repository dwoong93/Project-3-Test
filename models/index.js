const bookshelf = require('../bookshelf')
const Keyboardcase = bookshelf.model('Keyboardcase', {
tableName:'keyboardCase'//<-- the name of the table inside the MYSQL database
});
module.exports = {
    'Keyboardcase':Keyboardcase
}