import Mail from '../../lib/MailEntregaProduct';
import mailConfigSESAWS from '../../config/sesAWS';

class RedefinirPasswordMail {
  get key() {
    return 'RedefinirPasswordMail';
  }

  async handle({ data }) {
    const { user, link } = data;
    const { from } = mailConfigSESAWS.aws.ses;

    const mailOptions = {
      to: `${user.name} <${user.email}>`,
      from: from.default,
      subject: 'Redefinição de Senha',
      template: 'rederfinirpassword',
      context: {
        link,
        user: user.name,
      },
    };

    try {
      await Mail.sendMail(mailOptions, err => {
        if (err) {
          //          console.log('Error 1', err);
        }
      });
    } catch (err) {
      //     console.log(err);
    }
  }
}
export default new RedefinirPasswordMail();
