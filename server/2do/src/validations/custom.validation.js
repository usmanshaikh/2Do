const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const isNotPastDateTime = (value, helpers) => {
  const minutes = 2; // Add extra minutes
  const today = new Date().getTime() + minutes * 60000;
  const resDateTime = new Date(value).getTime();
  if (resDateTime < today) {
    return helpers.message('"{{#label}}" must not be in the past');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  isNotPastDateTime,
};
