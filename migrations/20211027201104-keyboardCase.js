'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('keyboardCase', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    name: {
      type: 'string',
      length: 100,
      notNull: false
    },
    material: {
      type: 'string',
      length: 100,
      notNull: false
    },
    size: {
      type: 'int',
      length: 100,
      notNull: false
    },
    keyboardKit: {
      type: 'string',
      length: 100,
      notNull: false
    },
    quantity: {
      type: 'int',
      unsigned: true,
    },
    cost: 'int',
    description: 'text'
  })
};
exports.down = function (db) {
  return db.dropTable('keyboardCase');
};
