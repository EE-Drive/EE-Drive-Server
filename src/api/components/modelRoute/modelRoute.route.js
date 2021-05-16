
let router = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const modelRouteController = require('./modelRoute.controller');

router.post('/add', modelRouteController.addFromForm);
router.post('/createModel', modelRouteController.createModelForRote);
router = genericModelRouter(modelRouteController, router);

module.exports = router;