import { Op } from 'sequelize';
import {
  parseISO,
  format,
  addHours,
  startOfDay,
  endOfDay,
  addHours,
} from 'date-fns';

import Order from '../models/Order';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Address from '../models/Address';
import City from '../models/City';
import State from '../models/State';
import Person from '../models/Person';
import Phone from '../models/Phone';

import FormatDataLocal from '../util/formatDataLocal';
import ByOrderIdSemDeliverymanService from '../services/ByOrderIdSemDeliverymanService';
import Cache from '../../lib/Cache';

class DeliveryManOrderController {
  async index(req, res) {
    const { id } = req.params;

    const order = await Order.findAll({
      where: { deliveryman_id: id, end_data: { [Op.ne]: null } },
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'problem',
        'status',
        'observation',
        'recipient_id',
        'withdrawal',
        'delivered',
        'withdrawProduct',
        'created_at',
      ],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'person_id', 'address_id'],
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
            {
              model: Address,
              as: 'address',
              attributes: [
                'id',
                'number',
                'street',
                'complement',
                'zip_code',
                'district',
                'city_id',
              ],
              include: [
                {
                  model: City,
                  as: 'city',
                  attributes: ['id', 'name'],
                  include: [
                    {
                      model: State,
                      as: 'state',
                      attributes: ['id', 'acronym'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).json(order);
  }

  async store(req, res) {
    const { id } = req.params;
    const { deliveryman_id } = req.body;

    const orderExist = await Order.findByPk(id);

    if (!orderExist) {
      return res.status(401).json({ error: 'Order not exists.' });
    }

    if (orderExist && orderExist.start_date !== null) {
      return res
        .status(402)
        .json({ error: 'order has already been withdrawn' });
    }

    /**Tendo em vista que ele poder retirar somente 5 por dia,
     *entretanto não esta claro que as mesmas devem ser entregues no mesmo dia
     *Sendo assim ele pode ficar com mais de 5 encomendas em mão sem que as mesmas
     *possam se entregues. Todavia, só pode ser retirada por dia são 5 unidades.
     **/

    const newDate = new Date();

    const startOfDayy = addHours(startOfDay(newDate), 3);
    const endOfDayy = addHours(endOfDay(newDate), 3);

    const countOrder = await Order.findAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDayy, endOfDayy],
        },
      },
    });

    if (countOrder.length > 4) {
      return res.status(403).json({
        error: 'The delivery person can only make 5 withdrawals per day.',
      });
    }

    //pega a data atual e acrescenta mais 3 horas, a diferença do fuso horário
    const date = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");
    const parsedDate = parseISO(date);

    const start_date = addHours(parsedDate, 3);

    await orderExist.update({
      start_date,
    });

    const ordearSearch = await ByOrderIdSemDeliverymanService.run({
      id,
    });

    const order_ = await FormatDataLocal.trataOrder({ order: ordearSearch });

    /**
     * Invalidate cache
     */
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newOrders`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newPending`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newDeliveries`);

    return res.status(200).json(order_);
  }

  async update(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists.' });
    }

    const newOrder = await order.update({ status: orderEnum.sucesso });

    /**
     * Invalidate cache
     */
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newOrders`);

    return res.status(200).json(newOrder);
  }
}

export default new DeliveryManOrderController();
