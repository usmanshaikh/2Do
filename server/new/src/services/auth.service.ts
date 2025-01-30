import { StatusCodes } from 'http-status-codes';
import { User } from '../models';
import redisClient from '../config/redisClient';
import { ApiError, jwtHelper } from '../helpers';
import { MESSAGES } from '../constants';

export const loginUserWithEmailAndPassword = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, MESSAGES.INCORRECT_EMAIL_OR_PASSWORD);
  }
  return user;
};

export const logoutUser = async (refreshToken: string) => {
  // Blacklist the token by setting it in Redis with a 'blacklisted' flag
  await redisClient.set(refreshToken, 'blacklisted', { EX: 7 * 24 * 60 * 60 }); // same expiry as the token
};

export const refreshAuth = async (refreshToken: string) => {
  // Check if the refresh token is blacklisted
  const isBlacklisted = await redisClient.get(refreshToken);
  if (isBlacklisted === 'blacklisted') {
    throw new ApiError(StatusCodes.FORBIDDEN, MESSAGES.INVALID_REFRESH_TOKEN);
  }

  // Verify the refresh token
  const payload = jwtHelper.verifyJwtToken(refreshToken);
  if (!payload || !payload.sub) {
    throw new ApiError(StatusCodes.FORBIDDEN, MESSAGES.EXPIRED_REFRESH_TOKEN);
  }

  // Generate new access and refresh tokens
  const newTokens = await jwtHelper.generateAuthTokens(payload.sub);

  // Blacklist the old refresh token
  await redisClient.set(refreshToken, 'blacklisted', {
    EX: 24 * 60 * 60, // Set 1 day expiration
  });

  // Save the new refresh token in Redis as valid
  await redisClient.set(newTokens.refresh.token, 'valid', {
    EX: 7 * 24 * 60 * 60, // Set 7 days expiration
  });

  return newTokens;
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
export const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserPassword(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
export const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.verifyUserEmail(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};
