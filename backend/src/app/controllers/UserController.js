import Person from '../models/Person';
import User from '../models/User';
import Group from '../models/Group';
import GroupUser from '../models/GroupUser';
import Person from '../models/Person';
import File from '../models/File';

import { addDays } from 'date-fns';
import Token from '../models/Token';

import CriarUserEnviaEmailAWS from '../jobs/CriarUserEnviaEmailAWS';
import Queue from '../../lib/Queue';
import IndexUserIDService from '../services/IndexUserIDService';
import IndexGroupIDUserService from '../services/IndexGroupIDUserService';

class UserController {
  async index(req, res) {
    const listUser = await User.findAll({
      attributes: [
        'id',
        'is_verified',
        'admin_master',
        'privacy',
        'last_login_at',
        'person_id',
      ],
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name', 'email', 'status'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: GroupUser,
          as: 'group_users',
          attributes: ['group_id'],
          include: [
            {
              model: Group,
              as: 'group',
              attributes: ['id', 'name', 'description'],
            },
          ],
        },
      ],
    });

    return res.json(listUser);
  }

  async store(req, res) {
    const { name: name_, email, role, password, admin_master } = req.body;
    const { terms } = req.body.privacy;

    const personExists = await Person.findOne({
      where: { email },
    });

    if (personExists) {
      return res.status(401).json({ error: 'User already exists.' });
    }

    const groupExists = await Group.findOne({
      where: { name: role },
    });

    if (!groupExists) {
      return res
        .status(402)
        .json({ error: 'Não foi possível encontrar o grupo para associar.' });
    }

    const {
      id: person_id,
      name: newName,
      email: newEmail,
    } = await Person.create({
      name: name_,
      email,
    });

    const user = await User.create({
      password,
      admin_master,
      privacy: terms,
      person_id,
    });

    const { id } = user;

    await GroupUser.create({
      user_id: id,
      group_id: groupExists.id,
    });

    // Create a verification token for this user

    const { code_active } = await Token.create({
      user_id: id,
      expires: addDays(new Date(), 1),
    });

    await Queue.add(CriarUserEnviaEmailAWS.key, {
      user: { name: newName, email: newEmail },
      code_active,
    });

    return res.status(200).json({ name: newName, email: newEmail });
  }

  async update(req, res) {
    const { email, oldPassword, name } = req.body;

    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'password', 'password_hash', 'person_id'],
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name', 'email', 'status'],
        },
      ],
    });

    if (email && email !== user.person.email) {
      const personExists = await Person.findOne({ where: { email } });

      if (personExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.person.update({ name, email });

    await user.update(req.body);

    const newUser = await IndexUserIDService.run({ userId: req.userId });

    const group_users = await IndexGroupIDUserService.run({
      userId: req.userId,
    });

    const { id, person, is_verified, last_login_at } = newUser;
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

  async delete(req, res) {
    const { id } = req.params;

    const userExists = await User.findByPk(id, {
      where: {
        admin_master: false,
      },
      include: [
        {
          model: Person,
          as: 'person',
        },
      ],
    });

    if (!userExists) {
      return res.status(400).json({ error: 'User not exists.' });
    }

    await userExists.person.update({ status: false });

    return res.status(200).json({ sucess: 'Usuário desabilitado com sucesso' });
  }
}

export default new UserController();
