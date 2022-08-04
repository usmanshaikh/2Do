const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Check if user uploaded the file. Basically check if req.file is present.
 */
const fileRequired = (req, res, next) => {
  if (!req.file) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Image is required');
  return next();
};

module.exports = fileRequired;
