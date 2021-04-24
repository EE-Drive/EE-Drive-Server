
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes');
const {ROUTES} = require('../config/global.constants');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(ROUTES.API, apiRouter);
app.get('/add', (req,res) => res.render('index'));

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB db connection successfully established'));
connection.once('close', () => console.log('MongoDB db connection successfully terminated'))

const connectToMongoose = dbUrl => { mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }); };
const closeMongooseConnection = () => { if(connection.readyState === 2) connection.close(); };

/**
 * Used to lunch an express sever with it's DB
 * 
 * @param {String} dbUrl mongoDb database url
 * @param {Number} port server listen port number
 * @return http server
 */
module.exports.startServer = (dbUrl, port) => {
    connectToMongoose(dbUrl);
    return app.listen(port, () => console.log('Server is running on port: ' + port));
};

/**
 * Used to close an http server and it's DB
 * 
 * @param {object} server 
 */
module.exports.closeServer = server => {
    closeMongooseConnection();
    server.close();
};
