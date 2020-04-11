import Person from '../models/Person';
import Phone from '../models/Phone';

import SearchDeliverymanIdService from '../services/SearchDeliverymanIdService';
import FormatDataLocal from '../util/formatDataLocal';

class ProfileController {
  async update(req, res) {
    const { id } = req.params;
    
    const { name, email, phone } = req.body.data;
    const { prefix, number } = phone;

    const deliverymanExists = await SearchDeliverymanIdService.run({
      id,
    });

    const { person } = deliverymanExists;

    if (email !== person.email) {
      const personExists = await Person.findOne({ where: { email } });

      if (personExists) {
        return res.status(403).json({ error: 'User already exists.' });
      }
    }

    const phoneExist = await Phone.findByPk(phone.phone_id, {
      attributes: ['id', 'prefix', 'number'],
    });

    if (!phoneExist) {
      return res.status(404).json({ error: 'Phone not exists.' });
    }

    if (prefix !== phoneExist.prefix || number !== phoneExist.number) {
      const newPhone = await Phone.findOne({
        where: { prefix, number },
        attributes: ['id', 'prefix', 'number'],
      });

      if (newPhone) {
        return res.status(405).json({ error: 'Phone already exists.' });
      }
    }

    await person.update({ name, email });
    await phoneExist.update({ prefix, number });

    const newDeliveryman = await SearchDeliverymanIdService.run({
      id,
    });

    const { created_at } = newDeliveryman.dataValues.person.dataValues;

    const date_ = await FormatDataLocal.subHours_time({
      date_at: created_at,
    });

    return res.json({
      user: { ...newDeliveryman.dataValues, created_at: date_ },
    });

  }
}

export default new ProfileController();
