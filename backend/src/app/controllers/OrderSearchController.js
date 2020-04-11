import SearchOrderIdService from '../services/SearchOrderIdService';

class OrderSearchController {
  async index(req, res) {
    const { id } = req.params;

    const order = await SearchOrderIdService.run({ id });

    return res.status(200).json(order);
  }
}

export default new OrderSearchController();
