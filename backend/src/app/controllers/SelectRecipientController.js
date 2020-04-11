import Person from '../models/Person';
import Recipient from '../models/Recipient';
import Phone from '../models/Phone';

class SelectRecipientController {
  //retorno para o select
  async index(req, res) {
    const recipients = await Recipient.findAll({
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name', 'phone_man_id'],
          include: [
            {
              model: Phone,
              as: 'phone',
              attributes: ['id', 'prefix', 'number'],
            },
          ],
        },
      ],
      attributes: ['id'],
    });

    const options = recipients.map(recipient => {
      const rec = {
        value: recipient.id,
        label: recipient.person.name,
      };
      return rec;
    });

    return res.json(options);
  }
}

export default new SelectRecipientController();
