import Person from '../models/Person';
import File from '../models/File';
import Person from '../models/Person';
import User from '../models/User';

class IndexUserIDService {
  async run({ userId }) {

    const user = await User.findByPk(userId, {
      attributes: [
        'id',
        'person_id',
        'password_hash',
        'is_verified',
        'admin_master',
        'last_login_at',
        'person_id',
      ],
      include: [
        {
          model: Person,
          as: 'person',
          attributes: ['id', 'name', 'email', 'status', 'privacy'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return user;
  }
}
export default new IndexUserIDService();
