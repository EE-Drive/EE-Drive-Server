
const axios = require('axios');

// Delete all data from the db
function DeleteFromUrl(url) {
  axios.get(url).then(({ data:items }) => items.forEach( ({ _id }) => axios.delete(`${url}/${_id}`)));
}

DeleteFromUrl('http://eedrive.cs.colman.ac.il/api/drive');
DeleteFromUrl('http://eedrive.cs.colman.ac.il/api/optimal-model');