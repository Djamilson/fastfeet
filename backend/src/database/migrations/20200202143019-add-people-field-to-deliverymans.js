module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliverymans', 'person_id', {
      type: Sequelize.INTEGER,
      references: { model: 'people', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliverymans', 'person_id');
  },
};
