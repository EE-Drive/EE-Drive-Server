
const GenericModelService = require('../../../services/genericModelService.util');
const OptimalModelModel = require('./optimalModel.model');

const optimalModelService = GenericModelService(OptimalModelModel);

optimalModelService.modelFromRouteID = (routeID, carTypeID) => OptimalModelModel.find({routeID, carTypeID});

module.exports = optimalModelService;