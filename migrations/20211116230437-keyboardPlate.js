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
  return db.createTable('keyboardPlate', {
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
    plateMaterial: {
      type: 'string',
      length: 100,
      notNull: false
    },
    size: {
      type: 'int',
      length: 100,
      notNull: false
    },
    quantity: {
      type: 'int',
      unsigned: true,
    },
    keyboardKit: {
      type: 'string',
      length: 100,
      notNull: false
    },
    cost: 'decimal(6,2)',
    description: 'text'
  })
};
exports.down = function (db) {
  return db.dropTable('keyboardPlate');
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
