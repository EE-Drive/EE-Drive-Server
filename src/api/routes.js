
const router = require("express").Router();
const carTypeRoute = require("./components/carType/carType.route");
const driveRoute = require("./components/drive/drive.route");
const modelRouteRoute = require("./components/modelRoute/modelRoute.route");
const optimalModelRoute = require("./components/optimalModel/optimalModel.route");
const { ROUTES } = require("../config/global.constants");

router.use(ROUTES.CAR_TYPE_ROUTE, carTypeRoute);
router.use(ROUTES.DRIVE_ROUTE, driveRoute);
router.use(ROUTES.MODEL_ROUTE_ROUTE, modelRouteRoute);
router.use(ROUTES.OPTIMAL_MODEL_ROUTE, optimalModelRoute);

module.exports = router;

