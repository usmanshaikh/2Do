import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import { ApiError } from '../helpers';

const multerStorage = multer.memoryStorage();

const multerFilter: multer.Options['fileFilter'] = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new ApiError(StatusCodes.BAD_REQUEST, 'Not an image! Please upload only image.') as unknown as null, false);
  }
};

/**
 * Multer configuration
 */
const uploadImage = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 }, // 1MB
});

export default uploadImage;
