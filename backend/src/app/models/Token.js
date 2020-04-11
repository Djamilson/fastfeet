import Sequelize, { Model } from 'sequelize';
import crypto from 'crypto';

class Token extends Model {
  static init(sequelize) {
    super.init(
      {
        expires: Sequelize.DATE,
        status: Sequelize.BOOLEAN,
        code_active: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async code => {
      code.code_active = await crypto.randomBytes(2).toString('hex');
    });

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Token;
