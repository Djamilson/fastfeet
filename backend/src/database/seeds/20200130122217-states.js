'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'states',
      [
        {
          name: 'Goiás',
          acronym: 'GO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Tocantins',
          acronym: 'TO',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'São Paulo',
          acronym: 'SP',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Rio de Janeiro',
          acronym: 'RJ',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('states', null, {});
  },
};
