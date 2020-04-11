module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('phones', 'person_id', {
      type: Sequelize.INTEGER,
      references: { model: 'people', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('phones', 'person_id');
  },
};
