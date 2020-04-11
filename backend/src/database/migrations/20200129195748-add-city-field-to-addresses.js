module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('addresses', 'city_id', {
      type: Sequelize.INTEGER,
      references: { model: 'cities', key: 'id' },
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('addresses', 'city_id');
  },
};
