
const GenericModelController = require('../../../services/genericModelController.util');
const modelRouteService = require('./modelRoute.service');

const MODEL_NAME = 'Model Route';
const mustProperties = ['routeStartingPoint', 'routeEndingPoint'];
const modelRouteController = GenericModelController(MODEL_NAME, modelRouteService, mustProperties, mustProperties); 

module.exports = modelRouteController;






