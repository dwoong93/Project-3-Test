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
    user_id: {
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
    keyboardcase_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
        foreignKey: {
          name: 'cart_items_keyboardcase_fk',
          table: 'keyboardCase',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
    },
    keyboardpcb_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
        foreignKey: {
          name: 'cart_items_keyboardpcb_fk',
          table: 'keyboardPcb',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
    },
    keyboardplate_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
        foreignKey: {
          name: 'cart_items_keyboardplate_fk',
          table: 'keyboardPlate',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
    },
    keyboardstabilizer_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
        foreignKey: {
          name: 'cart_items_keyboardstabilizer_fk',
          table: 'keyboardStabilizer',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
    },
    keyboardswitch_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
        foreignKey: {
          name: 'cart_items_keyboardswitch_fk',
          table: 'keyboardSwitch',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
    },
    keyboardkeycap_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
        foreignKey: {
          name: 'cart_items_keyboardkeycap_fk',
          table: 'keyboardKeycap',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
    },



  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
