import Person from '../models/Person';
import Deliveryman from '../models/Deliveryman';

class DeliveryManEnableController {
  //retorno para o select
  async index(req, res) {
    const listDeliverman = await Deliveryman.findAll({
      attributes: ['id', 'person_id'],
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name'],
        },
      ],
    });

    const options = listDeliverman.map(deliveryman => ({
      value: deliveryman.id,
      label: deliveryman.person.name,
    }));
    return res.json(options);
  }

  async update(req, res) {
    const { id } = req.params;

    const deliverymanExist = await Deliveryman.findByPk(id, {
      include: [
        {
          model: Person,
          as: 'person',
        },
      ],
    });

    if (!deliverymanExist) {
      return rep.status(401).json({ error: 'Deliveryman not exists.' });
    }

    const { person } = deliverymanExist;

    await person.update({ status: true });

    return res.status(200).json({ success: 'Success.' });
  }
}

export default new DeliveryManEnableController();
