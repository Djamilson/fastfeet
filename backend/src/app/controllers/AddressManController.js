import Recipient from '../models/Recipient';

import Address from '../models/Address';

class AndressManController {
  async update(req, res) {
    //id do address
    const { newId } = req.params;

    const addressExist = await Address.findByPk(newId, {
      attributes: ['id', 'recipient_id'],
    });

    if (!addressExist) {
      return res.status(400).json({ error: 'Address not exists.' });
    }

    const { id, recipient_id } = addressExist;

    const recipientExist = await Recipient.findByPk(recipient_id);

    if (!recipientExist) {
      return res.status(400).json({ error: 'Recipient not exists.' });
    }

    const recipientNewAddress = await recipientExist.update({
      delivery_address_id: id,
    });

    return res.json(recipientNewAddress);
  }
}

export default new AndressManController();
