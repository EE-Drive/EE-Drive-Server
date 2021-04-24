
const mongoose = require('mongoose');
const schemaTypes = require('../../../config/schemaTypes.constants');

//model schema 
const modelSchema = new mongoose.Schema({
    bL:schemaTypes.landMark, 
    bR:schemaTypes.landMark,
    tL: schemaTypes.landMark, 
    tR:schemaTypes.landMark, 
},{ timestamps:true });

// export and create model
module.exports = mongoose.model('ModelRoute', modelSchema);