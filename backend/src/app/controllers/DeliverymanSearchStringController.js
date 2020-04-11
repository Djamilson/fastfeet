import SearchDeliverymanStringService from '../services/SearchDeliverymanStringService';

class DeliverymanSearchStringController {
  async index(req, res) {
    const { page, search } = req.query;

    const newDeliveryman = await SearchDeliverymanStringService.run({
      page,
      search,
    });

    return res.json(newDeliveryman);
  }
}

export default new DeliverymanSearchStringController();
