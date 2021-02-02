
const genericModelRouter = require('../../../services/genericModelRouter');
const modelRouteController = require('./modelRoute.controller');

const router = genericModelRouter(modelRouteController);

module.exports = router;