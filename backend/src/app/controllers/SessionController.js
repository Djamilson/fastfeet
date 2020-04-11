import jwt from 'jsonwebtoken';

import User from '../models/User';
import Person from '../models/Person';
import IndexGroupIDUserService from '../services/IndexGroupIDUserService';

import File from '../models/File';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      attributes: [
        'id',
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
          where: { email },
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

    // Make sure the user has been verified
    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }
    // Make sure the user has been verified
    if (user && !user.is_verified) {
      return res.status(401).json({
        error:
          'Seu email ainda não foi validado, acesse sua conta de email e confirme a validação do acesso!',
      });
    }

    // Make sure the user has been verified
    if (user && !user.person.status) {
      return res.status(402).json({
        error:
          'No momento esse usuário está desativado, entre em contato com o administrador!',
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(404).json({ error: 'Password does not match' });
    }

    const group_users = await IndexGroupIDUserService.run({ userId: user.id });

    const { id, person, is_verified, last_login_at, person_id } = user;
    return res.json({
      user: {
        id,
        person,
        is_verified,
        group_users,
        last_login_at,
      },
      token: jwt.sign({ id: person_id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
