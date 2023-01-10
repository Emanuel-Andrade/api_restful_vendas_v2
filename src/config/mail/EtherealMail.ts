import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IContactMail {
  email: string;
  name: string;
}

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

interface ISendMail {
  to: IContactMail;
  from?: IContactMail;
  subject: string;
  templateData: IParseMailTemplate;
}

class EtherealMail {
  async send({ to, templateData, from, subject }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'time@apivendas.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await HandlebarsMailTemplate.parse(templateData),
    });

    console.log('message sent: %s', message.messageId);
    console.log('preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new EtherealMail();
