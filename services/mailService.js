const nodemailer = require('nodemailer');

class MailService {
  constructor(args) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // hostname
      secureConnection: false, // TLS requires secure connection to be false
      port: 587, // predefined port for outlook mailers
      tls: {
        ciphers: 'SSLv3' // Specific TLS cipher declaration for Outlook mailer
      },
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
      ...args,
    })
  }

  async send(args) {
    const defaultOptions = {
        //replace with a default email
      from: 'default@email.com',
      to: process.env.NODEMAILER_EMAIL,
      subject: 'default email triggered',
      text: 'A default email has been sent instead of an intended email. The user may or may not know',
      html: 'This is a default message. Your email tool may not be working correctly'
    };

    const options = {
      ...defaultOptions,
      ...args
    };

    try {
      return await this.transporter.sendMail(options);
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = MailService;