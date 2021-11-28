module.exports = {
  requiredFields: ['name', 'age', 'hobbies'],
  messages: {
    REQUIRED_FIELDS: 'Request body should contain required fields',
    PERSON_NOT_FOUND: 'Person Not Found',
    INVALID_UUID: 'Invalid PersonId. Not uuid',
    NOT_FOUND: 'Not Found. Please check if URL is correct',
  },
};
