const http = require('http');
require('dotenv').config();
const { getAllPersons } = require('./utils/dbController');

const PORT = process.env.PORT || 5000;

const app = () => {
  const server = http.createServer(async (req, res) => {
    if (req.url === '/person' && req.method === 'GET') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      const persons = await getAllPersons();
      return res.end(JSON.stringify(persons));
    }
  });

  server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
};

module.exports = app;
