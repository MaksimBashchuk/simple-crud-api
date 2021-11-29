const { validate } = require('uuid');
const {
  getById,
  findAll,
  create,
  update,
  deleteById,
} = require('./personAction');
const { messages } = require('./constants');
const { createInternalServerError, fieldsChecker } = require('./helpers');

const isValidId = (res, id) => {
  if (!validate(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        message: messages.INVALID_UUID,
      })
    );
  }
};

const isPersonExists = async (res, id) => {
  if (!(await getById(id))) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        message: messages.PERSON_NOT_FOUND,
      })
    );
  }
};

const checkRequiredFields = (res, reqBody) => {
  if (!fieldsChecker(reqBody)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        message: messages.REQUIRED_FIELDS,
      })
    );
  }
};

const getAllPersons = async (res) => {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const persons = await findAll();
    return res.end(JSON.stringify(persons));
  } catch (error) {
    createInternalServerError(res, messages.INTERNAL_ERROR);
  }
};

const getPerson = async (res, id) => {
  try {
    const person = await getById(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(person));
  } catch (error) {
    createInternalServerError(res, messages.INTERNAL_ERROR);
  }
};

const createPerson = async (res, reqBody) => {
  try {
    const newPerson = await create(reqBody);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newPerson));
  } catch (error) {
    createInternalServerError(res, messages.INTERNAL_ERROR);
  }
};

const updatePerson = async (res, id, reqBody) => {
  try {
    const updatedPerson = await update(id, reqBody);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(updatedPerson));
  } catch (error) {
    createInternalServerError(res, messages.INTERNAL_ERROR);
  }
};

const deletePerson = async (res, id) => {
  try {
    await deleteById(id);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    return res.end();
  } catch (error) {
    createInternalServerError(res, messages.INTERNAL_ERROR);
  }
};

module.exports = {
  isValidId,
  isPersonExists,
  checkRequiredFields,
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
