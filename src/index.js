
require('dotenv').config();
const {startServer, closeServer} = require('./api/server');

PORT = process.env.PORT || 8080;
DB_URL = process.env.DB_URL;

startServer(DB_URL, PORT);

