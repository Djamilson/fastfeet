import { Op } from 'sequelize';

import FormatDataLocal from '../util/formatDataLocal';

import Cache from '../../lib/Cache';

import IndexOrderService from '../services/IndexOrderService';

class DeliveryManAllOrderController {
  async index(req, res) {
    const { id } = req.params;
    const { page, limit } = req.query;
    const pageSize = limit;

    const cachekey = `deliveryman:${id}:newPending:${page}`;
    const cached = await Cache.get(cachekey);

    if (cached) {
      return res.json(cached);
    }

    const querywhere = {
      deliveryman_id: id,
      start_date: { [Op.ne]: null },
      end_date: null,
    };

    const { orders, orderInfo } = await IndexOrderService.run({
      page,
      pageSize,
      querywhere,
    });

    const order = await FormatDataLocal.trataData({ orders });

    const newPending = { list: order, orderInfo };

    await Cache.set(cachekey, newPending);

    return res.status(200).json(newPending);
  }
}

export default new DeliveryManAllOrderController();
