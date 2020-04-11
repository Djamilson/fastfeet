module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('addresses', 'person_id', {
      type: Sequelize.INTEGER,
      references: { model: 'people', key: 'id' },
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('addresses', 'person_id');
  },
};
