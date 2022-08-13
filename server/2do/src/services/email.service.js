const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const fs = require('fs');

// Current Directory
const dirPath = path.join(__dirname, '..');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

// HBS Config
const hbsOptions = {
  viewEngine: {
    layoutsDir: path.join(dirPath, 'views', 'layouts'),
    partialsDir: path.join(dirPath, 'views', 'partials'),
    extname: '.handlebars',
    defaultLayout: 'main',
  },
  extName: '.handlebars',
  viewPath: path.join(dirPath, 'views'),
};
transport.use('compile', hbs(hbsOptions));

/**
 * Get Email Template Style
 * @param {string} templateTitle
 * @returns {Promise}
 */
const getEmailTemplateStyle = async () => {
  let templateStyle = fs.readFileSync(path.resolve(dirPath, './public/css/email-template.css'));
  return templateStyle.toString();
};

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, template, context) => {
  const msg = { from: config.email.from, to, subject, template, context };
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
  const templateToUse = 'resetPasswordTemplate';
  const templateStyle = await getEmailTemplateStyle();
  const templateContent = {
    templateStyle,
    templateTitle: 'Reset Password',
    resetPasswordUrl,
  };
  await sendEmail(to, subject, templateToUse, templateContent);
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
  const templateToUse = 'emailVerificationTemplate';
  const templateStyle = await getEmailTemplateStyle();
  const templateContent = {
    templateStyle,
    templateTitle: 'Email Verification',
    verificationEmailUrl,
  };
  await sendEmail(to, subject, templateToUse, templateContent);
};

/**
 * Send reminder email
 * @param {object} eventInfo
 * @param {object} user
 * @returns {Promise}
 */
const sendEventReminderEmail = async (eventInfo, user) => {
  const { title, dateAndTime } = eventInfo;
  const to = user.email;
  const subject = 'Event Reminder';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=`;
  const templateToUse = 'reminderEmailTemplate';
  const templateStyle = await getEmailTemplateStyle();
  const templateContent = {
    templateStyle,
    templateTitle: 'Event Reminder',
    verificationEmailUrl,
    eventMsg: title,
    eventDateTime: dateAndTime,
  };
  await sendEmail(to, subject, templateToUse, templateContent);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEventReminderEmail,
};
