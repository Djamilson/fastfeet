import { Model } from 'sequelize';

class GroupUser extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Group, { foreignKey: 'group_id', as: 'group' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default GroupUser;
