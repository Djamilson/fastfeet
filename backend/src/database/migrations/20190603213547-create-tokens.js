module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      expires: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      code_active: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'test',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('tokens');
  },
};
