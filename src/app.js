const http = require('http');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = () => {
  const server = http.createServer((req, res) => {});

  server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
};

module.exports = app;
