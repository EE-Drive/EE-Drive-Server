
const router = require('express').Router();
const carTypeRoute = require('./components/carType/carType.route');
const modelRouteRoute = require('./components/modelRoute/modelRoute.route');
const driveRoute = require('./components/drive/drive.route');
const {ROUTES} = require('../config/global.constants');

router.use(ROUTES.CAR_TYPE_ROUTE, carTypeRoute);
router.use(ROUTES.DRIVE_ROUTE, driveRoute);
router.use(ROUTES.MODEL_ROUTE_ROUTE, modelRouteRoute);


module.exports = router;