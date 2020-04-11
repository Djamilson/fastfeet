import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Person from '../models/Person';
import Phone from '../models/Phone';
import Address from '../models/Address';
import City from '../models/City';
import State from '../models/State';


class SearchDeliverymanController {
  //retorno para o select
  async index(req, res) {
    const { id } = req.params;
   
    const recipient = await Deliveryman.findByPk(id, {
      attributes: ['id', 'person_id','address_id'],

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
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
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

export default new SearchDeliverymanController();
