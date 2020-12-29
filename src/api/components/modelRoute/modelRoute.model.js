
const mongoose = require('mongoose');
const schemaTypes = require('../../../config/schemaTypes.constants');

//model schema 
const modelSchema = new mongoose.Schema({
    routeStartingPoint: schemaTypes.landMark,
    routeEndingPoint: schemaTypes.landMark,
},{ timestamps:true });

// export and create model
module.exports = mongoose.model('ModelRoute', modelSchema);