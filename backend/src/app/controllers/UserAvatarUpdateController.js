import { Op } from 'sequelize';
import Person from '../models/Person';
import User from '../models/User';
import Person from '../models/Person';
import GroupUser from '../models/GroupUser';
import Group from '../models/Group';
import File from '../models/File';

import IndexGroupIDUserService from '../services/IndexGroupIDUserService';
import IndexUserIDService from '../services/IndexUserIDService';

class UserAvatarUpdateController {
  async update(req, res) {
    const { avatar_id } = req.params;
   
    const user = await IndexUserIDService.run({ userId: req.useId });
    await user.person.update({ avatar_id });

    const group_users = await IndexGroupIDUserService.run({ userId: req.useId });

    const { id, person, is_verified, last_login_at } = user;
    return res.json({
      user: {
        id,
        person,
        is_verified,
        group_users,
        last_login_at,
      },
    });
  }
}

export default new UserAvatarUpdateController();
