import Recipient from '../models/Recipient';
import Person from '../models/Person';
import Phone from '../models/Phone';
import Address from '../models/Address';
import City from '../models/City';
import State from '../models/State';

class SearchRecipientController {
  //retorno para o select
  async index(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id, {
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
    });

    return res.json(recipient);
  }
}

export default new SearchRecipientController();
