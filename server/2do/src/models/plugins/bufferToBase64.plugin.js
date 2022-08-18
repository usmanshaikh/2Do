/**
 * Convert Buffer to base64
 */
const bufferToBase64 = (schema) => {
  let transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }
  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      if (ret.image) ret.image.data = convertBufferToBase64(ret.image.data);
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};

const convertBufferToBase64 = (doc) => {
  return Buffer.from(doc).toString('base64');
};

module.exports = bufferToBase64;
