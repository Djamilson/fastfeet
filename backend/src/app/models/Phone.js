import Sequelize, { Model } from 'sequelize';

class Phone extends Model {
  static init(sequelize) {
    super.init(
      {
        prefix: Sequelize.STRING,
        number: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' });
  }
}

export default Phone;
