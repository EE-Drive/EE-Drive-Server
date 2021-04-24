
const GenericModelController = require('../../../services/genericModelController.util');
const modelRouteService = require('./modelRoute.service');

const MODEL_NAME = 'Model Route';
const mustProperties = ['bL', 'bR', 'tL', 'tR'];
const modelRouteController = GenericModelController(MODEL_NAME, modelRouteService, mustProperties, mustProperties); 

modelRouteController.addFromForm = async (req,res) => {
    const {bLLat, bLLong, bRLat, bRLong, tLLat, tLLong, tRLat, tRLong} = req.body;
    const item = await modelRouteService.addItem({
        bL:{lat: bLLat, long: bLLong}, 
        bR:{lat: bRLat, long: bRLong},
        tL: {lat: tLLat, long: tLLong}, 
        tR:{lat: tRLat, long: tRLong}, 
    })
    console.log(item);
    res.render('index');
};

module.exports = modelRouteController;






