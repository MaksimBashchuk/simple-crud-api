const http = require('http');
const { validate } = require('uuid');
require('dotenv').config();
const { getReqBody, fieldsChecker, getIdFromURL } = require('./utils/helpers');
const {
  addPerson,
  getAllPersons,
  getPersonById,
  updatePerson,
  deletePerson,
} = require('./utils/dbController');
const { messages } = require('./utils/constants');

const PORT = process.env.PORT || 5000;

const app = () => {
  const server = http.createServer(async (req, res) => {
    const rawBody = await getReqBody(req);
    const reqBody = rawBody ? JSON.parse(rawBody) : '';
    const id = getIdFromURL(req.url);

    if (req.url.match(/\/person\/\w+/)) {
      if (!validate(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            message: messages.INVALID_UUID,
          })
        );
      }

      if (!(await getPersonById(id))) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            message: messages.PERSON_NOT_FOUND,
          })
        );
      }
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      if (!fieldsChecker(reqBody)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            message: messages.REQUIRED_FIELDS,
          })
        );
      }
    }

    if (req.url === '/person' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const persons = await getAllPersons();
      return res.end(JSON.stringify(persons));
    }

    if (req.url.match(/\/person\/\w+/) && req.method === 'GET') {
      const person = await getPersonById(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(person));
    }

    if (req.url === '/person' && req.method === 'POST') {
      const newPerson = await addPerson(reqBody);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newPerson));
    }

    if (req.url.match(/\/person\/\w+/) && req.method === 'PUT') {
      const updatedPerson = await updatePerson(id, reqBody);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updatedPerson));
    }

    if (req.url.match(/\/person\/\w+/) && req.method === 'DELETE') {
      await deletePerson(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      return res.end();
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: messages.NOT_FOUND }));
  });

  server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
};

module.exports = app;
