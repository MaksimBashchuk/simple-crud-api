const { requiredFields } = require('./constants');

const getReqBody = (req) =>
  new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });

const fieldsChecker = (body) => requiredFields.every((item) => body[item]);

module.exports = {
  getReqBody,
  fieldsChecker,
};
