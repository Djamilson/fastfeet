module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'person_id', {
      type: Sequelize.INTEGER,
      references: { model: 'people', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'person_id');
  },
};
