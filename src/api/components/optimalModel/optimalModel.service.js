
const GenericModelService = require('../../../services/genericModelService.util');
const OptimalModelModel = require('./optimalModel.model');

const optimalModelService = GenericModelService(OptimalModelModel);

module.exports = optimalModelService;