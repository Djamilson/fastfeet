import Sequelize from 'sequelize';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Order from '../models/Order';
import Address from '../models/Address';
import City from '../models/City';
import State from '../models/State';
import Deliveryman from '../models/Deliveryman';
import Person from '../models/Person';
import Phone from '../models/Phone';

class IndexOrderService {
  async run({ page, pageSize, querywhere }) {
    //limit

    const ret = await Order.findAndCountAll({
      where: {
        ...querywhere,
        delete_at: null,
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [
        ['id', 'DESC'],
        ['product', 'ASC'],
      ],
    });

    console.log('Total:', ret.count);
    const pages = Math.ceil(ret.count / pageSize);

    const orderInfo = { page, pages, total: ret.count, limit: pageSize };

    const orders = await Order.findAll({
      where: { ...querywhere, delete_at: null },
      order: [
        ['id', 'DESC'],
        ['product', 'ASC'],
      ],
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
        'color',
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
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
                      attributes: ['id', 'name', 'acronym'],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
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
          ],
        },
      ],
    });
    return { orders, orderInfo };
  }
}
export default new IndexOrderService();
