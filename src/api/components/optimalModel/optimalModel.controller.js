
const GenericModelController = require('../../../services/genericModelController.util');
const optimalModelService = require('./optimalModel.service');

const MODEL_NAME = 'Optimal Model';
const mustProperties = ['carTypeID', 'routeID', 'vertices', 'edges'];
const allowedPropertiesToUpdate = ['vertices', 'edges'];
const modelRouteController = GenericModelController(MODEL_NAME, optimalModelService, mustProperties, allowedPropertiesToUpdate); 

module.exports = modelRouteController;