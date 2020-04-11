import { Op } from 'sequelize';
import GroupUser from '../models/GroupUser';
import Group from '../models/Group';


class IndexGroupIDUserService {
  async run({ userId }) {

    const group_users = await GroupUser.findAll({
      where: { user_id: userId },
      attributes: ['id'],
      include: [
        {
          model: Group,
          as: 'group',
          attributes: ['id', 'name', 'description'],
          where: {
            name: {
              [Op.ne]: 'role-entregador',
            },
          },
        },
      ],
    });

    return group_users;
  }
}
export default new IndexGroupIDUserService();
