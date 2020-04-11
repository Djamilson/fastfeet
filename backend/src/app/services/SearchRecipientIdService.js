import Recipient from '../models/Recipient';
import Address from '../models/Address';
import City from '../models/City';
import State from '../models/State';
import Person from '../models/Person';
import Phone from '../models/Phone';

class SearchRecipientIdService {
  async run({ id }) {
    const newRecipient = await Recipient.findByPk(id, {
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name', 'email', 'status', 'phone_man_id'],
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
      attributes: ['id'],
    });
    return newRecipient;
  }
}
export default new SearchRecipientIdService();
