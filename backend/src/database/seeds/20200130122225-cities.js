'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'cities',
      [
        {
          name: 'Goânia',
          state_id: '1',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Palmas',
          state_id: '2',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'São Paulo',
          state_id: '3',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Rio de Janeiro',
          state_id: '4',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cities', null, {});
  },
};
