module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('delivery_problems', 'order_id', {
      type: Sequelize.INTEGER,
      references: { model: 'orders', key: 'id' },
      onUpdate: 'CASCADE',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('delivery_problems', 'order_id');
  },
};
