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
  return db.createTable('cart_items', {
    id: { type: 'int', unsigned: true, primaryKey: true, autoIncrement: true },
    quantity: {type: 'int', unsigned:true},
    customer_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'cart_items_customer_fk',
        table: 'customers',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      }
    },
    product_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'cart_items_product_fk',
        table: 'products',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  });
  };

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
