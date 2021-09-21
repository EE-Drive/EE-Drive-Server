const axios = require('axios');
const { extractData } = require("./util");

const LEARN_URL = 'http://localhost:8000/items/';

module.exports.learn = (dataToLearn) => axios
    .post(LEARN_URL, { rawdata: dataToLearn })
    .then(extractData);
