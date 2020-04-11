import Deliveryman from '../models/Deliveryman';
import Person from '../models/Person';
import File from '../models/File';
import Person from '../models/Person';
import Phone from '../models/Phone';

class SearchDeliverymanIdService {
  async run({ id }) {
    const deliverymanExist = await Deliveryman.findByPk(id, {
      attributes: ['id', 'person_id'],
      include: [
        {
          model: Person,
          as: 'person',
          attributes: [
            'id',
            'name',
            'email',
            'created_at',
            'status',
            'privacy',
            'initName',
          ],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
            {
              model: Phone,
              as: 'phone',
              attributes: ['id', 'prefix', 'number'],
            },
          ],
        },
      ],
    });

    // Make sure the user has been verified
    if (!deliverymanExist) {
      return res.status(401).json({ error: 'Deliveryman not found' });
    }

    // Make sure the user has been verified
    if (deliverymanExist && !deliverymanExist.person.status) {
      return res.status(402).json({
        error:
          'No momento esse usuário está desativado, entre em contato com o administrador!',
      });
    }

    return deliverymanExist;
  }
}

export default new SearchDeliverymanIdService();
