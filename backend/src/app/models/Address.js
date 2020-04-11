import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        number: Sequelize.STRING,
        street: Sequelize.STRING,
        complement: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        district: Sequelize.STRING
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.City, { foreignKey: 'city_id', as: 'city' });
    this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' });
  }
}

export default Address;
