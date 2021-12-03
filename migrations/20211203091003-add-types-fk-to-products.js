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

exports.up = function(db) {
  return db.addColumn(
    'products', 'types_id', {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'products_types_fk',
        table: 'types',
        rules: {
          onDelete: 'cascade',
          onUpdate: 'restrict'
        },
        mapping: 'id'
      }
    },
  )
};

exports.down = function(db) {
  return db.removeForeignKey(
    'products', 'products_types_fk',function(){
    db.removeColumn('products','types_id')
    }
  )
};

exports._meta = {
  "version": 1
};
