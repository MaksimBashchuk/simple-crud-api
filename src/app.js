const http = require('http');
require('dotenv').config();
const { getReqBody, getIdFromURL } = require('./utils/helpers');
const { messages } = require('./utils/constants');
const {
  isValidId,
  checkRequiredFields,
  isPersonExists,
  getAllPersons,
  getPerson,
  updatePerson,
  createPerson,
  deletePerson,
} = require('./utils/dbConroller');

const PORT = process.env.PORT || 5000;

const app = () => {
  const server = http.createServer(async (req, res) => {
    const rawBody = await getReqBody(req);
    const reqBody = rawBody ? JSON.parse(rawBody) : '';
    const id = getIdFromURL(req.url);

    if (req.url.match(/\/person\/\w+/)) {
      if (isValidId(res, id) || (await isPersonExists(res, id))) {
        return;
      }
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      if (checkRequiredFields(res, reqBody)) {
        return;
      }
    }

    if (req.url === '/person' && req.method === 'GET') {
      getAllPersons(res);
      return;
    }

    if (req.url.match(/\/person\/\w+/) && req.method === 'GET') {
      getPerson(res, id);
      return;
    }

    if (req.url === '/person' && req.method === 'POST') {
      createPerson(res, reqBody);
      return;
    }

    if (req.url.match(/\/person\/\w+/) && req.method === 'PUT') {
      updatePerson(res, id, reqBody);
      return;
    }

    if (req.url.match(/\/person\/\w+/) && req.method === 'DELETE') {
      deletePerson(res, id);
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: messages.NOT_FOUND }));
  });

  server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
};

module.exports = app;
