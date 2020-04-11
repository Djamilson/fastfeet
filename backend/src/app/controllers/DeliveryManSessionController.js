import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import SearchDeliverymanPasswordService from '../services/SearchDeliverymanPasswordService';
import FormatDataLocal from '../util/formatDataLocal';

class DeliveryManSessionController {
  async store(req, res) {
    const { password } = req.body;

    const deliverymanExist = await SearchDeliverymanPasswordService.run({
      password,
    });

    const { person_id } = deliverymanExist;

    const { created_at } = deliverymanExist.dataValues.person.dataValues;

    const date_ = await FormatDataLocal.subHours_time({
      date_at: created_at,
    });

    return res.json({
      user: { ...deliverymanExist.dataValues, created_at: date_ },
      token: jwt.sign({ id: person_id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new DeliveryManSessionController();
