import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';

class IndexProblemService {
  async run({ page, pageSize, querywhere }) {
    //limit

    const ret = await DeliveryProblem.findAndCountAll({
      where: querywhere,
      include: [
        {
          model: Order,
          as: 'order',
          where: { delete_at: null },
        },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [
        ['id', 'DESC'],
        ['description', 'ASC'],
      ],
    });

    const pages = Math.floor(ret.count / pageSize);

    const problemInfo = { page, pages, total: ret.count, limit: pageSize };

    const problems = await DeliveryProblem.findAll({
      where: querywhere,
      order: [
        ['id', 'DESC'],
        ['description', 'ASC'],
      ],
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
          attributes: ['id', 'canceled_at', 'product'],
          where: { delete_at: null },
        },
      ],

      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return { problems, problemInfo };
  }
}
export default new IndexProblemService();
