import Order from '../models/Order';
import Cache from '../../lib/Cache';

class OrderController {
  async delete(req, res) {
    const { id } = req.params;
    const orderExists = await Order.findByPk(id);

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not exists.' });
    }
    const { deliveryman_id } = orderExists;

    const order = await orderExists.update({
      start_date: null,
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

export default new OrderController();
