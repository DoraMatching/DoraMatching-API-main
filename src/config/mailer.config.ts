import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const mailAddress = process.env.MAIL_ADDRESS;
export const mailPassword = process.env.MAIL_PASSWORD;

export const mailerConfig: MailerOptions = {
  transport: {
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: mailAddress,
      pass: mailPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  defaults: {
    from: 'nest-modules <modules@nestjs.com>',
  },
  template: {
    dir: join(process.cwd(), 'src/templates/pages'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
  options: {
    partials: {
      dir: join(process.cwd(), 'src/templates/partials'),
      options: {
        strict: true,
      },
    },
  },
};
