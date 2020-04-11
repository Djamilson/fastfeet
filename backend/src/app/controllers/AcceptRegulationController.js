import SearchDeliverymanIdService from '../services/SearchDeliverymanIdService';
import FormatDataLocal from '../util/formatDataLocal';

class AcceptRegulationController {
  async update(req, res) {
    const { newPrivacy, deliveryman_id } = req.body;

    const deliverymanExist = await SearchDeliverymanIdService.run({
      id: deliveryman_id,
    });

    const { person } = deliverymanExist;
    await person.update({ privacy: newPrivacy });

    const { created_at } = deliverymanExist.dataValues.person.dataValues;

    const date_ = await FormatDataLocal.subHours_time({
      date_at: created_at,
    });

    return res.json({
      user: { ...deliverymanExist.dataValues, created_at: date_ },
    });

  }
}

export default new AcceptRegulationController();
