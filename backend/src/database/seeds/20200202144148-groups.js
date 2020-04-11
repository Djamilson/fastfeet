'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'groups',
      [
        {
          name: 'role-maste',
          description: 'Master',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'role-administrador',
          description: 'Administrador',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'role-entregador',
          description: 'Entregador',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('groups', null, {});
  },
};
