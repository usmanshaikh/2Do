const moment = require('moment');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const notificationService = require('./notification.service');

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
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, template, context) => {
  const msg = { from: config.email.from, to, subject, template, context };
  await transport.sendMail(msg);
  logger.info(`${subject} => Email Send`);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token, req) => {
  const origin = getOriginURL(req);
  const subject = 'Reset password';
  const resetPasswordUrl = `${origin}/reset-password?token=${token}`;
  const templateToUse = 'resetPasswordTemplate';
  const templateContent = {
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
const sendVerificationEmail = async (to, token, req) => {
  const origin = getOriginURL(req);
  const subject = 'Email Verification';
  const verificationEmailUrl = `${origin}/verify-email?token=${token}`;
  const templateToUse = 'emailVerificationTemplate';
  const templateContent = {
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
const sendEventReminderEmail = async (eventInfo, eventType, user, req) => {
  let { title, dateAndTime } = eventInfo;
  dateAndTime = moment(dateAndTime).format('dddd, MMMM Do YYYY, hh:mm a');
  const to = user.email;
  const subject = 'Event Reminder';
  const eventLink = `http://localhost:3001/${eventType}/add-edit-${eventType}?${eventType}Id=${eventInfo._id}&edit=true`;
  const templateToUse = 'reminderEmailTemplate';
  const templateContent = {
    templateTitle: 'Event Reminder',
    eventLink,
    eventMsg: title,
    eventDateTime: dateAndTime,
  };
  await sendEmail(to, subject, templateToUse, templateContent);
  createNotificationAfterEmailSend(title, eventLink, eventType, false, user.id);
};

const createNotificationAfterEmailSend = async (message, link, type, isRead, userId) => {
  const noficationBody = { message, link, type, isRead, userId };
  notificationService.createNotification(noficationBody);
};

const getOriginURL = (req) => {
  return req.get('origin');
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEventReminderEmail,
};
