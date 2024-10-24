import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import { __dirname } from '../utils/pathUtils.js';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .required()
      .default(30)
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().required().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .required()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .required()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().required().description('server that will send the emails'),
    SMTP_PORT: Joi.number().required().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().required().description('username for email server'),
    SMTP_PASSWORD: Joi.string().required().description('password for email server'),
    EMAIL_FROM: Joi.string().required().description('the from field in the emails sent by the app'),
    ORIGIN_URL: Joi.string().required().description('Origin URL for email template link'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Set & Use Database as per Environment
if (envVars.NODE_ENV === 'production') {
  envVars.MONGODB_URL = envVars.MONGODB_URL.replace(/<DATABASE>/g, envVars.NODE_ENV);
} else if (envVars.NODE_ENV === 'development') {
  envVars.MONGODB_URL = envVars.MONGODB_URL.replace(/<DATABASE>/g, envVars.NODE_ENV);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  origin_url: envVars.ORIGIN_URL,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
