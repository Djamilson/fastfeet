import { Op } from 'sequelize';
import Sequelize from 'sequelize';
import Recipient from '../models/Recipient';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Person from '../models/Person';
import Phone from '../models/Phone';

import CadOrderMailAWS from '../jobs/CadOrderMailAWS';
import IndexOrderService from '../services/IndexOrderService';

import Queue from '../../lib/Queue';
import Cache from '../../lib/Cache';

function checkFilter(value) {
  if (value === 'true') {
    return { canceled_at: { [Op.ne]: null } };
  }

  return { canceled_at: null };
}

class OrderController {
  async index(req, res) {
    const { page, limit, q, filter } = req.query;
    const pageSize = limit;

    const query = `%${q || ''}%`; // string de consulta
/*
    const p = await Order.findAll({
      where: Sequelize.where(
        Sequelize.fn('unaccent', Sequelize.col('product')),
        {
          [Op.iLike]: `%${q || ''}%`,
        }
      ),
      order: [['product', 'ASC']],
    });
*/
    //console.log('IDIDIIDI:::', p.id);


    const querywhere = {
      product: { [Op.iLike]: query },
      ...checkFilter(filter),
    };

    const { orders, orderInfo } = await IndexOrderService.run({
      page,
      pageSize,
      querywhere,
    });

    const newOrders = { list: orders, orderInfo };

    return res.status(200).json( newOrders);
  }

  async store(req, res) {
    const { person, product, observation } = req.body;

    const { recipient_id, deliveryman_id } = person;

    const recipientExist = await Recipient.findByPk(recipient_id, {
      attributes: ['id'],
    });

    if (!recipientExist) {
      return res.status(401).json({ error: 'Recipient not exists.' });
    }

    const deliverymanExist = await Deliveryman.findByPk(deliveryman_id, {
      attributes: ['id', 'person_id'],
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name', 'email', 'phone_man_id'],
          include: [
            {
              model: Phone,
              as: 'phone',
              attributes: ['id', 'prefix', 'number'],
            },
          ],
        },
      ],
    });

    if (!deliverymanExist) {
      return res.status(402).json({ error: 'Deliveryman not exists.' });
    }

    await Order.create({
      recipient_id: recipient_id,
      deliveryman_id: deliveryman_id,
      product,
      observation,
    });

    await Queue.add(CadOrderMailAWS.key, {
      user: deliverymanExist.person,
      code_active: product,
    });

    /**
     * Invalidate cache
     */
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newOrders`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newPending`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newDeliveries`);

    return res.status(200).json({ sucess: true });
  }

  async update(req, res) {
    const { id } = req.params;

    const { person, product, observation } = req.body;
    const { recipient_id, deliveryman_id } = person;

    const orderExist = await Order.findByPk(id);

    if (!orderExist) {
      return res.status(400).json({ error: 'Order not exists.' });
    }

    const recipientExist = await Recipient.findByPk(recipient_id, {
      attributes: ['id'],
    });

    if (!recipientExist) {
      return res.status(401).json({ error: 'Recipient not exists.' });
    }

    const deliverymanExist = await Deliveryman.findByPk(deliveryman_id, {
      attributes: ['id'],
    });

    if (!deliverymanExist) {
      return res.status(402).json({ error: 'Deliveryman not exists.' });
    }

    await orderExist.update({
      deliveryman_id,
      recipient_id,
      product,
      observation,
    });

    /**
     * Invalidate cache
     */
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newOrders`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newPending`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newDeliveries`);

    return res.status(200).json({ success: true });
  }

  async delete(req, res) {
    const { id } = req.params;
    const orderExists = await Order.findByPk(id, {});

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not exists.' });
    }
    const { deliveryman_id } = orderExists;
    orderExists.delete_at = new Date();
    orderExists.save();

    /**
     * Invalidate cache
     */

    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newOrders`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newPending`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newDeliveries`);

    //await order.destroy();

    return res.status(204).json();
  }
}

export default new OrderController();
