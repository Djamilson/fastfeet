import { parseISO, format, addHours, addHours } from 'date-fns';
import { Op } from 'sequelize';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

import Order from '../models/Order';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Person from '../models/Person';

import IndexProblemService from '../services/IndexProblemService'

class ProblemController {
  async index(req, res) {

    const { page, limit, q } = req.query;
    const pageSize = limit;

    const query = `%${q || ''}%`; // string de consulta

    const querywhere = {
      description: { [Op.iLike]: query },
    };

    const { problems, problemInfo } = await IndexProblemService.run({
      page,
      pageSize,
      querywhere,
    });

    const newOrders = { list: problems, problemInfo };

    return res.status(200).json(newOrders);
  }

  async store(req, res) {
    const { order_id } = req.params;
    const { description } = req.body;

    const orderExist = await Order.findByPk(order_id);

    if (!orderExist) {
      return res.status(401).json({ error: 'Order not exists.' });
    }

    const { deliveryman_id } = orderExist;

    const newDeliveryProblem = await DeliveryProblem.create({
      deliveryman_id,
      description,
      order_id,
    });

    await orderExist.update({ problem: true });

    return res.status(200).json(newDeliveryProblem);
  }

  async update(req, res) {
    const { id } = req.params;

    const orderExist = await Order.findByPk(id, {
      attributes: ['id', 'deliveryman_id', 'product'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'person_id'],
          include: [
            {
              model: Person,
              as: 'person',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    if (!orderExist) {
      return res.status(401).json({ error: 'Order not exists.' });
    }

    if (orderExist && orderExist.canceled_at !== null) {
      return res.status(402).json({ error: 'Order already canceled.' });
    }

    const { person } = orderExist.deliveryman;
    const { product } = orderExist;
    //pega a data atual e acrescenta mais 3 horas, a diferença do fuso horário
    const date = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");
    const parsedDate = parseISO(date);

    const canceled_at = addHours(parsedDate, 3);

    const order = await orderExist.update({
      canceled_at,
    });

    await Queue.add(CancellationMail.key, {
      user: person,
      code_active: product,
    });

    return res.status(200).json(order);
  }

  async delete(req, res) {
    return res.status(200).json({ sucess: 'Success!' });
  }
}

export default new ProblemController();
