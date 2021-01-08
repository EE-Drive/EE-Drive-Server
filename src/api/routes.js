
const carTypeRoute = require('./components/carType/carType.route');
const modelRouteRoute = require('./components/modelRoute/modelRoute.route');
const {ROUTES} = require('../config/global.constants');

module.exports.configureRoutes = app => {
    app.use(ROUTES.CAR_TYPE_ROUTE, carTypeRoute);
    app.use(ROUTES.MODEL_ROUTE_ROUTE, modelRouteRoute);
};