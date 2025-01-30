import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Types } from 'mongoose';
import config from '../config/config';
import redisClient from '../config/redisClient';

export const generateToken = (
  userId: Types.ObjectId,
  expires: moment.Moment,
  type: string,
  secret: string = config.jwt.secret,
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

export const verifyJwtToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    return decoded;
  } catch (error) {
    console.error('Invalid JWT:', error);
    return null;
  }
};

export const generateAuthTokens = async (
  userId: any,
): Promise<{
  access: { token: string; expires: Date };
  refresh: { token: string; expires: Date };
}> => {
  const accessTokenExpires = moment().add(parseInt(config.jwt.accessExpirationMinutes!), 'minutes');
  const accessToken = generateToken(userId, accessTokenExpires, 'ACCESS');

  const refreshTokenExpires = moment().add(parseInt(config.jwt.refreshExpirationDays!), 'days');
  const refreshToken = generateToken(userId, refreshTokenExpires, 'REFRESH');

  await redisClient.set(refreshToken, 'valid', { EX: 7 * 24 * 60 * 60 }); // 7 days in seconds

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

export const generateResetPasswordToken = (email: string): string => {
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const payload = {
    sub: email,
    iat: moment().unix(),
    exp: expires.unix(),
    type: 'RESET_PASSWORD',
  };
  return jwt.sign(payload, config.jwt.secret);
};

export const generateVerifyEmailToken = (user: any): string => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: expires.unix(),
    type: 'VERIFY_EMAIL',
  };
  return jwt.sign(payload, config.jwt.secret);
};
