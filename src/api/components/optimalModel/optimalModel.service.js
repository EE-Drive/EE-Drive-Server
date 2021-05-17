
const GenericModelService = require('../../../services/genericModelService.util');
const OptimalModelModel = require('./optimalModel.model');

const optimalModelService = GenericModelService(OptimalModelModel);

optimalModelService.modelFromRouteID = routeID => OptimalModelModel.find({routeID});

module.exports = optimalModelService;