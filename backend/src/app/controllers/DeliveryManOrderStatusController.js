import { Op } from 'sequelize';

import { parseISO, format, addHours, startOfDay, endOfDay } from 'date-fns';

import Order from '../models/Order';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Address from '../models/Address';
import City from '../models/City';
import State from '../models/State';
import Person from '../models/Person';
import Phone from '../models/Phone';

import FormatDataLocal from '../util/formatDataLocal';
import Cache from '../../lib/Cache';

import IndexOrderService from '../services/IndexOrderService';

class DeliveryManOrderStatusController {
  async index(req, res) {
    const { id } = req.params;
    const { page, limit } = req.query;
    const pageSize = limit;

    const cachekey = `deliveryman:${id}:newOrders:${page}`;
    const cached = await Cache.get(cachekey);

    if (cached) {
      return res.json(cached);
    }

    const querywhere = {
      deliveryman_id: id,
      end_date: null,
    };

    const { orders, orderInfo } = await IndexOrderService.run({
      page,
      pageSize,
      querywhere,
    });

    const order = await FormatDataLocal.trataData({ orders });

    const newOrders = { list: order, orderInfo };

    await Cache.set(cachekey, newOrders);

    return res.status(200).json(newOrders);
  }

  async update(req, res) {
    const { id } = req.params;

    const orderExist = await Order.findByPk(id, {
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'status',
        'observation',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
      ],
    });

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
     *possam se entregues. Todavia, só pode ser retirada por dia 5 unidades.
     **/

    const newDate = new Date();

    const startOfDayy = addHours(startOfDay(newDate), 3);
    const endOfDayy = addHours(endOfDay(newDate), 3);

    const countOrder = await Order.findAll({
      where: {
        deliveryman_id: orderExist.deliveryman_id,
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

    const order = await orderExist.update({
      start_date,
    });

    return res.status(200).json(order);
  }
}

export default new DeliveryManOrderStatusController();
