import moment from 'moment';
import path from 'path';
import { Request } from 'express';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import config from '../config/config';
import logger from '../config/logger';
import { checklistInterface, taskInterface, userInterface } from '../interfaces';

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

export const sendEmail = async (
  email: string,
  subject: string,
  template: string,
  context: Record<string, any>,
): Promise<void> => {
  const msg = { from: config.email.from, to: email, subject, template, context };
  await transport.sendMail(msg);
  logger.info(`${subject} => Email Sent`);
};

export const sendResetPasswordEmail = async (email: string, token: string, req: Request): Promise<void> => {
  const subject = 'Reset Your Password';
  const resetPasswordUrl = `${req.protocol}://${req.get('host')}/reset-password?token=${token}`;
  const templateToUse = 'resetPasswordTemplate';
  const templateContent = {
    templateTitle: 'Reset Your Password',
    resetPasswordUrl,
  };
  await sendEmail(email, subject, templateToUse, templateContent);
};

export const sendVerificationEmail = async (email: string, token: string, req: Request): Promise<void> => {
  const subject = 'Verify Your Email';
  const verifyEmailUrl = `${req.protocol}://${req.get('host')}/verify-email?token=${token}`;
  const templateToUse = 'emailVerificationTemplate';
  const templateContent = {
    templateTitle: 'Verify Your Email',
    verifyEmailUrl,
  };
  await sendEmail(email, subject, templateToUse, templateContent);
};

export const sendEventReminderEmail = async (
  eventInfo: taskInterface.ITask | checklistInterface.IChecklist,
  eventType: 'task' | 'checklist',
  user: userInterface.IUser,
) => {
  const { title, dateAndTime } = eventInfo;
  const formattedDate = moment(dateAndTime).format('dddd, MMMM Do YYYY, hh:mm a');
  const to = user.email;
  const subject = 'Event Reminder';
  const eventLink = `${config.origin_url}/${eventType}/add-edit-${eventType}?${eventType}Id=${eventInfo._id}&edit=true`;
  const templateToUse = 'reminderEmailTemplate';
  const templateContent = {
    templateTitle: 'Event Reminder',
    eventLink,
    eventMsg: title,
    eventDateTime: formattedDate,
  };
  await sendEmail(to, subject, templateToUse, templateContent);
};
