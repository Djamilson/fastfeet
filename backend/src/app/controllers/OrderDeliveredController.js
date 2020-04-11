import { Op } from 'sequelize';
import { parseISO, format, addHours } from 'date-fns';

import Order from '../models/Order';

import File from '../models/File';
import Recipient from '../models/Recipient';
import Address from '../models/Address';
import City from '../models/City';
import State from '../models/State';
import Person from '../models/Person';
import Recipient from '../models/Recipient';
import Phone from '../models/Phone';

import CreateFileService from '../services/CreateFileService';
import FormatDataLocal from '../util/formatDataLocal';
import Cache from '../../lib/Cache';
import IndexOrderService from '../services/IndexOrderService';


class OrderSuccessController {
  async index(req, res) {
    const { id } = req.params;
    const { page, limit } = req.query;
    const pageSize = limit;

    const cachekey = `deliveryman:${id}:newDeliveries:${page}`;
    const cached = await Cache.get(cachekey);

    if (cached) {
      return res.json(cached);
    }

    const querywhere = {
      deliveryman_id: id,
      signature_id: {
        [Op.ne]: null,
      },
    };

    const { orders, orderInfo } = await IndexOrderService.run({
      page,
      pageSize,
      querywhere,
    });

    const order = await FormatDataLocal.trataData({ orders });

    const newDeliveries = { list: order, orderInfo };

    await Cache.set(cachekey, newDeliveries);

    return res.status(200).json(newDeliveries);
  }

  async update(req, res) {
    const {
      originalname: name,
      filename: path,
      key,
      destination,
      location,
      path: filePath,
    } = req.file;

    const { id } = req.params;

    const order = await Order.findByPk(id);
    const { deliveryman_id } = order;

    if (!order) {
      return res.status(400).json({ error: 'Order not exists.' });
    }

    if (order.end_date !== null) {
      return res.status(401).json({ error: 'Order already delivered.' });
    }

    //pega a data atual e acrescenta mais 3 horas é a diferença do fuso horário
    const date = format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx");
    const parsedDate = parseISO(date);
    const end_date = addHours(parsedDate, 3);

    const newFile = await CreateFileService.run({
      name,
      path,
      key,
      destination,
      location,
      filePath,
    });

    const newOrder = await order.update({
      end_date,
      signature_id: newFile._id,
    });

    /**
     * Invalidate cache
     */

    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newOrders`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newPending`);
    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:newDeliveries`);

    return res.status(200).json(newOrder);
  }
}

export default new OrderSuccessController();
