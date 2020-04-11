module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('people', 'phone_man_id', {
      type: Sequelize.INTEGER,
      references: { model: 'phones', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('people', 'phone_man_id');
  },
};
