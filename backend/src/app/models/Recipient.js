import { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Address, {
      foreignKey: 'address_id',
      as: 'address',
    });
    this.belongsTo(models.Person, {
      foreignKey: 'person_id',
      as: 'person',
    });
  }
}

export default Recipient;
