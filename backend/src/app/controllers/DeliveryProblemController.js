import { parseISO, format, addHours, addHours } from 'date-fns';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

import Order from '../models/Order';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Person from '../models/Person';

import FormatDataLocal from '../util/formatDataLocal';

import Cache from '../../lib/Cache';

class DeliveryProblemController {
  async index(req, res) {
    const { order_id } = req.params;

    const problems = await DeliveryProblem.findAll({
      where: { order_id },
      attributes: [
        'id',
        'description',
        'deliveryman_id',
        'order_id',
        'created_at',
      ],
      include: [
        {
          model: Order,
          as: 'order',
          where: { delete_at: null },
        },
      ],
    });

    const listProblems = await FormatDataLocal.trataCreate_at({ problems });

    return res.json(listProblems);
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

  async delete(req, res) {
    const { id } = req.params;
   
    const orderExist = await Order.findByPk(id, {
      attributes: ['id', 'deliveryman_id', 'product', 'canceled_at'],
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
    const { deliveryman_id } = orderExist;
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

    /**
     * Invalidate cache
     */

    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newOrders`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newPending`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newDeliveries`);

    return res.status(200).json(order);
  }
}

export default new DeliveryProblemController();
