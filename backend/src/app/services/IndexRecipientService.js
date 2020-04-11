import Recipient from '../models/Recipient';
import Address from '../models/Address';
import City from '../models/City';
import State from '../models/State';
import Person from '../models/Person';
import Phone from '../models/Phone';

class IndexRecipientService {
  async run({ page, pageSize, querywhere }) {
    
    const ret = await Recipient.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name'],
          order: ['name', 'ASC'],
          where: querywhere,
        },
      ],
    });

    const pages = Math.floor(ret.count / pageSize);

    const recipientInfo = { page, pages, total: ret.count, limit: pageSize };
    const recipients = await Recipient.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name', 'email', 'status', 'phone_man_id'],
          order: ['name', 'ASC'],
          where: querywhere,
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
          ],
          include: [
            {
              model: City,
              as: 'city',
              attributes: ['id', 'state_id', 'name'],
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
    });

    return { recipients, recipientInfo };
  }
}
export default new IndexRecipientService();
