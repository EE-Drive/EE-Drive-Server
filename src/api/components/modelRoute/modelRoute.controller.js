
const GenericModelController = require('../../../services/genericModelController.util');
const modelRouteService = require('./modelRoute.service');

const MODEL_NAME = 'Model Route';
const mustProperties = ['routeStartingPoint', 'routeEndingPoint'];
const modelRouteController = GenericModelController(MODEL_NAME, modelRouteService, mustProperties, mustProperties); 

modelRouteController.addFromForm = async (req,res) => {
    const {fromLat, fromLong, toLat, toLong} = req.body;
    const item = await modelRouteService.addItem({
        routeStartingPoint: {lat: fromLat, long: fromLong},
        routeEndingPoint: {lat: toLat, long: toLong}
    })
    console.log(item);
    res.render('index');
};

module.exports = modelRouteController;






