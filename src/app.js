const http = require('http');
const { validate } = require('uuid');
require('dotenv').config();
const { getReqBody, fieldsChecker, getIdFromURL } = require('./utils/helpers');
const {
  addPerson,
  getAllPersons,
  getPersonById,
} = require('./utils/dbController');
const { messages } = require('./utils/constants');

const PORT = process.env.PORT || 5000;

const app = () => {
  const server = http.createServer(async (req, res) => {
    if (req.url === '/person' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const persons = await getAllPersons();
      return res.end(JSON.stringify(persons));
    }

    if (req.url.match(/\/person\/\w+/) && req.method === 'GET') {
      const id = getIdFromURL(req.url);

      if (!validate(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            message: messages.INVALID_UUID,
          })
        );
      }

      const person = await getPersonById(id);

      if (!person) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            message: messages.PERSON_NOT_FOUND,
          })
        );
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(person));
    }

    if (req.url === '/person' && req.method === 'POST') {
      const reqBody = await getReqBody(req);
      if (!fieldsChecker(JSON.parse(reqBody))) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            message: messages.REQUIRED_FIELDS,
          })
        );
      }

      const newPerson = await addPerson(JSON.parse(reqBody));
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newPerson));
    }
  });

  server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
};

module.exports = app;
