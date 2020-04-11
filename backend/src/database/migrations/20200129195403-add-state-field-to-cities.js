module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cities', 'state_id', {
      type: Sequelize.INTEGER,
      references: { model: 'states', key: 'id' },
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('cities', 'state_id');
  },
};
