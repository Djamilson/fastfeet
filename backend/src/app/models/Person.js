import Sequelize, { Model } from 'sequelize';

class Person extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        privacy: Sequelize.BOOLEAN,
        initName: {
          type: Sequelize.VIRTUAL,
          get() {
            const stringInit = this.name.toUpperCase();
            const array = stringInit.split(' ');
            const char1 = stringInit[0];

            if (array.length < 2 ) {
              return `${char1}${stringInit[1]}`;
            }

            if (array.length = 2 ) {
              return `${char1}${array[1][0]}`;
            }

            if (array.length > 2 && array[1].length > 3) {
              return `${char1}${array[1][0]}`;
            }

            return `${char1}${array[1][0]}`;
          },
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Phone, { foreignKey: 'phone_id', as: 'phones' });
    this.hasMany(models.Address, { foreignKey: 'address_id', as: 'addresses' });
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Phone, { foreignKey: 'phone_man_id', as: 'phone' });
  }
}

export default Person;
