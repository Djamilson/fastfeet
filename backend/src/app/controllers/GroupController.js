import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, parseISO } from 'date-fns';
import Group from '../models/Group';

class GroupController {
  async index(req, res) {
    const master = 'role_master';
    // trás todos os grupos exeto o master
    const groups = await Group.findAll({
      where: {
        name: {
          [Op.ne]: master,
        },
      },
      attributes: ['id', 'name', 'description'],
    });

    return res.json(groups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;

    const group = await Group.create({
      ...req.body,
      user_id,
    });

    return res.json(group);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user_id = req.userId;

    const group = await Group.findByPk(req.params.id);

    if (group.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Group date invalid' });
    }

    if (group.past) {
      return res.status(400).json({ error: "Can't update past groups." });
    }

    await group.update(req.body);

    return res.json(group);
  }
}

export default new GroupController();
