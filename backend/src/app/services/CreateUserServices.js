import GroupUser from '../models/GroupUser';
import User from '../models/User';

class CreateUserService {
  async run({
    password,
    admin_master,
    person_id,
    group_id,
    is_verified,
  }) {
  
    const user = await User.create({
      password,
      admin_master,
      person_id,
      is_verified,
    });

    const { id } = user;

    await GroupUser.create({
      user_id: id,
      group_id,
    });

    return user;
  }
}
export default new CreateUserService();
