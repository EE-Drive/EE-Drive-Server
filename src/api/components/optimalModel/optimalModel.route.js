
const genericModelRouter = require('../../../services/genericModelRouter');
const optimalModelController = require('./optimalModel.controller');

const router = genericModelRouter(optimalModelController);

module.exports = router;
