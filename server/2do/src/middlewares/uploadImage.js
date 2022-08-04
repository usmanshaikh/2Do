const multer = require('multer');
const ApiError = require('../utils/ApiError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Not an image! Please upload only image.'), false);
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

module.exports = uploadImage;
