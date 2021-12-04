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
  return db.createTable('keyboardkits_products', {
    id: {
      'type': 'int',
      'unsigned': true,
      'primaryKey': true,
      'notNull': true,
      'autoIncrement': true
    },
    //foreign key for kits table
    'keyboardkit_id': {
      'type': 'int',
      'unsigned': true,
      'notNull': true,
      'foreignKey': {
        'name': 'keyboardkits_products_keyboardkit_fk',
        'table': 'keyboardkits',
        'mapping': 'id',
        'rules': {
          'onDelete': 'CASCADE', //if product is deleted, corresponding row in keyboardCase_keyboardPcb will be deleted as well.
        },
      }
    },
    //foreign key for products table
    'product_id': {
      'type': 'int',
      'unsigned': true,
      'notNull': true,
      'foreignKey': {
        'name': 'keyboardkits_products_product_fk',
        'table': 'products',
        'mapping': 'id',
        'rules': {
          'onDelete': 'CASCADE',
        },
      }
    },

  });
};

exports._meta = {
  "version": 1
};
