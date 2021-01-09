
const mongoose = require('mongoose');
const schemaTypes = require('../../../config/schemaTypes.constants');

const modelSchema = new mongoose.Schema({
    companyName: schemaTypes.requiredMediumString,
    brandName: schemaTypes.requiredMediumString,
    year: schemaTypes.requiredSmallString,
    drivesID: [{type: mongoose.Schema.ObjectId, ref:'Drive'}],
    modelsID: [{type: mongoose.Schema.ObjectId, ref:'OptimalModel'}],
},{ timestamps:true });

module.exports = mongoose.model('CarType', modelSchema);