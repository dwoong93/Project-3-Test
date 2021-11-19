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
  return db.createTable('keyboardCase_keyboardPcb', {
        id: {
          'type': 'int',
          'unsigned': true,
          'primaryKey': true,
          'notNull':true,
          'autoIncrement': true
        },
        //foreign key for keyboardCase table
          'keyboardcase_id': {
          'type': 'int',
          'unsigned':true,
          'notNull': true,
          'foreignKey': {
            'name': 'keyboardCase_keyboardPcb_keyboardCase_fk',
            'table': 'keyboardCase',
            'mapping': 'id',
            'rules': {
                'onDelete': 'CASCADE', //if product is deleted, corresponding row in keyboardCase_keyboardPcb will be deleted as well.
                'onUpdate': 'RESTRICT'
            }, 
          }
          },
        //foreign key for keyboardPcb table
         'keyboardpcb_id': {
          'type': 'int',
          'unsigned':true,
          'notNull': true,
          'foreignKey': {
            'name': 'keyboardCase_keyboardPcb_keyboardPcb_fk',
            'table': 'keyboardPcb',
            'mapping': 'id',
            'rules': {
                'onDelete': 'CASCADE',
                'onUpdate': 'RESTRICT'
            }, 
          }
          }, 

  });
};

exports._meta = {
  "version": 1
};
