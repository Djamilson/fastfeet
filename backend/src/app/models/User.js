import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        is_verified: Sequelize.BOOLEAN,
        admin_master: Sequelize.BOOLEAN,
        last_login_at: Sequelize.DATE,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.GroupUser, {
      foreignKey: 'user_id',
      as: 'group_users',
    });

    this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
