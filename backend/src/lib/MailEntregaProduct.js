import nodemailer from 'nodemailer';
import { resolve } from 'path';
import hbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';
import sesTransport from 'nodemailer-ses-transport';

import mailConfigSESAWS from '../config/sesAWS';

class MailEntregaProduct {
  constructor() {
    const { key, secret, ses } = mailConfigSESAWS.aws;

    this.transporter = nodemailer.createTransport(
      sesTransport({
        accessKeyId: key,
        secretAccessKey: secret,
        region: ses.region,
        rateLimit: 5,
      })
    );

    this.configureTemplate();
  }

  configureTemplate() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfigSESAWS.aws.ses.from.default,
      ...message,
    });
  }
}

export default new MailEntregaProduct();
