import Mail from '../../lib/MailEntregaProduct';
import mailConfigSESAWS from '../../config/sesAWS';

class CriarUserEnviaEmailAWS {
  get key() {
    return 'CriarUserEnviaEmailAWS';
  }

  async handle({ data }) {
    const { user, link, code_active } = data;
    const { from } = mailConfigSESAWS.aws.ses;

    const mailOptions = {
      template: 'activation',
      from: from.default,
      to: `${user.name} <${user.email}>`,
      subject: 'Validação de conta',
      context: {
        link,
        user: user.name,
        code_active,
      },
      ReturnPath: from.default,
      Source: from.default,
    };

    try {
      await Mail.sendMail(mailOptions, err => {
        //console.log('>>>!!!', mailOptions);
        if (err) {
        //  console.log(err, err.stack);
        }
      });
    } catch (err) {
      //console.log('a casa caiu!!!', err);
    }
  }
}

export default new CriarUserEnviaEmailAWS();
