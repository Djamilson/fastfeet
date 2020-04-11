import Deliveryman from '../models/Deliveryman';
import Person from '../models/Person';
import Phone from '../models/Phone';
import File from '../models/File';

class IndexDeliverymanService {
  async run({ page, pageSize, querywhere }) {

    const ret = await Deliveryman.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name'],
          order: ['name', 'ASC'],
          where: querywhere,
        },
      ],
    });

    const pages = Math.floor(ret.count / pageSize);

    const deliverymanInfo = { page, pages, total: ret.count, limit: pageSize };
    const deliverymans = await Deliveryman.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name', 'email', 'status', 'initName', 'phone_man_id'],
          order: ['name', 'ASC'],
          where: querywhere,
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
      attributes: ['id', 'person_id','password'],
    });

    return { deliverymans, deliverymanInfo };
  }
}
export default new IndexDeliverymanService();
