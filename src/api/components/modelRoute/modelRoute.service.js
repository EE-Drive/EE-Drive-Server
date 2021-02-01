
const GenericModelService = require('../../../services/genericModelService.util');
const ModelRouteModel = require('./modelRoute.model');

const modelRouteService = GenericModelService(ModelRouteModel);

module.exports = modelRouteService;