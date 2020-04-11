import File from '../models/File';
import Recipient from '../models/Recipient';
import Order from '../models/Order';
import Address from '../models/Address';
import City from '../models/City';
import State from '../models/State';
import Deliveryman from '../models/Deliveryman';
import Person from '../models/Person';
import Phone from '../models/Phone';


class SearchOrderIdService {
  async run({ id }) {
    const order = await Order.findByPk(id, {
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
      where: {
        canceled_at: null,
        start_date: null,
      },
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
                'id',
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
        {
          model: Deliveryman,
          as: 'deliveryman',
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
        },
      ],
    });

    return order;
  }
}
export default new SearchOrderIdService();
