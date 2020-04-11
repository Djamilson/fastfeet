'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'group_users',
      [
        {
          group_id: '2',
          user_id: '1',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('group_users', null, {});
  },
};
