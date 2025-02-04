import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService, categoryService, emailService, userService } from '../services';
import { catchAsync } from '../middlewares';
import { sendResponse, jwtHelper } from '../helpers';
import { MESSAGES } from '../constants';

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  await categoryService.createDefaultCategoryAfterRegister(user._id as string);
  sendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    message: MESSAGES.USER_REGISTERED,
    data: user,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await jwtHelper.generateAuthTokens(user.id);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.LOGIN_SUCCESS,
    data: { user, tokens },
  });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  await authService.logoutUser(refreshToken);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.LOGOUT_SUCCESS,
  });
});

export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refreshAuth(refreshToken);
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: MESSAGES.TOKENS_REFRESHED_SUCCESS,
    data: tokens,
  });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = jwtHelper.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken, req);
  sendResponse({
    res,
    statusCode: StatusCodes.NO_CONTENT,
    message: MESSAGES.PASSWORD_RESET_EMAIL_SENT,
  });
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.query.token;
  if (typeof token !== 'string') {
    return sendResponse({
      res,
      statusCode: StatusCodes.BAD_REQUEST,
      message: MESSAGES.INVALID_TOKEN,
    });
  }
  await authService.resetPassword(token, req.body.password);
  sendResponse({
    res,
    statusCode: StatusCodes.NO_CONTENT,
    message: MESSAGES.PASSWORD_RESET_SUCCESS,
  });
});

export const sendVerificationEmail = catchAsync(async (req: Request, res: Response) => {
  const verifyEmailToken = jwtHelper.generateVerifyEmailToken(res.locals.user);
  await emailService.sendVerificationEmail(res.locals.user.email, verifyEmailToken, req);
  sendResponse({
    res,
    statusCode: StatusCodes.NO_CONTENT,
    message: MESSAGES.VERIFICATION_EMAIL_SENT,
  });
});

export const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const token = req.query.token;
  if (typeof token !== 'string') {
    return sendResponse({
      res,
      statusCode: StatusCodes.BAD_REQUEST,
      message: MESSAGES.INVALID_TOKEN,
    });
  }
  await authService.verifyEmail(token);
  return sendResponse({
    res,
    statusCode: StatusCodes.NO_CONTENT,
    message: MESSAGES.EMAIL_VERIFIED_SUCCESS,
  });
});
