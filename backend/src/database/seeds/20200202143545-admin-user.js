const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          person_id: '1',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
          is_verified: true,
          admin_master: true,
        },
      ],
      {}
    );
  },

  down: () => {},
};
