
const carTypeRoute = require('./components/carType/carType.route');
const {ROUTES} = require('../config/global.constants');

module.exports.configureRoutes = app => {
    app.use(ROUTES.CAR_TYPE_ROUTE, carTypeRoute);
};