const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const fs = require('fs');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

const sendEmail2 = async (to, subject, text) => {
  const dir = path.join(__dirname, '..');

  const templateStyleFileContent = fs.readFileSync(path.resolve(dir, './public/css/email-template.css'));
  const templateStyle = templateStyleFileContent.toString();

  const options = {
    viewEngine: {
      layoutsDir: path.join(dir, 'views', 'layouts'),
      partialsDir: path.join(dir, 'views', 'partials'),
      extname: '.handlebars',
      defaultLayout: 'main',
    },
    extName: '.handlebars',
    viewPath: path.join(dir, 'views'),
  };

  transport.use('compile', hbs(options));

  const templateContent = {
    templateStyle,
    templateTitle: 'Reset Password',
  };

  const msg = { from: config.email.from, to, subject, template: 'resetPasswordEmailTemplate', context: templateContent };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
