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
  return db.createTable('keyboardSwitch', {
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
    brand: {
      type: 'string',
      length: 100,
      notNull: false
    },
    switchType: {
      type: 'string',
      length: 100,
      notNull: false
    },
    quantity: {
      type: 'int',
      unsigned: true,
    },
    switchConnectionType: {
      type: 'string',
      length: 100,
      notNull: false
    },
    cost: 'int',
    description: 'text'
  })
};
exports.down = function (db) {
  return db.dropTable('keyboardSwitch');
};

exports._meta = {
  "version": 1
};
