// Setting up the database connection
const knex = require('knex')({
    client: 'mysql',
    connection: {
    user: 'dwoong',
    password:'kopipeng123',
    database:'keyboard'
    }
    })
    const bookshelf = require('bookshelf')(knex)
    module.exports = bookshelf;