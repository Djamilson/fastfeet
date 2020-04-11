import User from '../models/User';
import GroupUser from '../models/GroupUser';
import Group from '../models/Group';

class GroupUserController {
  async index(req, res) {
    const groupUser = await GroupUser.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Group,
        },
      ],
    });

    return res.json(groupUser);
  }

  async store(req, res) {
    const user = await User.findByPk(req.body.userId);
    const group = await Group.findByPk(req.body.groupId);

    const checkExists = await GroupUser.findOne({
      where: {
        user_id: user.id,
        group_id: group.id,
      },
    });

    if (checkExists) {
      return res
        .status(400)
        .json({ error: 'Esse grupo já está associado ao usuário!' });
    }

    const groupUser = await GroupUser.create({
      user_id: user.id,
      group_id: group.id,
    });

    return res.json(groupUser);
  }

  async update(req, res) {
    const { listGroup } = req.body;
    const { user_id } = listGroup[0];

    const groupUserExist = await GroupUser.findAll({
      where: { user_id },
    });

    if (groupUserExist.length > 0) {
      await groupUserExist.map(async group => {
        await group.destroy({ force: true });
      });
    }

    listGroup.map(async group => {
      if (group.checked) {
        await GroupUser.create({
          user_id: group.user_id,
          group_id: group.id,
        });
      } else {
        await group.destroy({ force: true });
      }
    });

    return res.status(200).json({ ok: 'ok' });
  }
}

export default new GroupUserController();
