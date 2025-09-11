const dotenv = require('dotenv');
const nodeMailer = require('nodemailer');

dotenv.config({ path: './config.env' });

exports.sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Aroma <makanta@mkt.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  await transporter.sendMail(mailOptions);
};
