import Recipient from '../models/Recipient';

import Address from '../models/Address';
import City from '../models/City';
import State from '../models/State';

class AndressController {
  async index(req, res) {
    const { recipient_id } = req.params;
    const listAddress = await Address.findAll({
      where: { recipient_id },
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
    });

    return res.json(listAddress);
  }

  async store(req, res) {
    const { recipient_id } = req.body;

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(401).json({ error: 'Recipient not exists.' });
    }

    const newAddress = await Address.create(req.body);

    return res.status(200).json(newAddress);
  }

  async update(req, res) {
    //id do address
    const { id } = req.params;

    const addressExist = await Address.findByPk(id, {
      attributes: [
        'id',
        'number',
        'street',
        'complement',
        'zip_code',
        'district',
      ],
    });

    if (!addressExist) {
      return res.status(400).json({ error: 'Address not exists.' });
    }

    const newAddress = await addressExist.update(req.body);

    return res.json(newAddress);
  }
}

export default new AndressController();
