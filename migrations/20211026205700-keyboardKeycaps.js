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
  return db.createTable('keyboardKeycaps', {
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
    keycapMaterial: {
      type: 'string',
      length: 100,
      notNull: false
    },
    keycapProfile: {
      type: 'string',
      length: 100,
      notNull: false
    },
    cost: 'int',
    description: 'text'
  })
};
exports.down = function (db) {
  return db.dropTable('keyboardKeycaps');
};
