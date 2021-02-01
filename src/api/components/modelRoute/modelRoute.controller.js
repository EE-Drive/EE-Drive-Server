const modelRouteService = require('./modelRoute.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const {validateKeysInObject, validateObjectKeys} = require('../../../services/validations.util');
const MODEL_NAME = 'Model Route';

/**
 * Used to receive all modelRoutes from the DB
 * 
 * @respond modelRoutes array
 */
module.exports.getModelRoutes = async (req, res) => {
    try {
        const modelRoutes = await modelRouteService.getModelRoutes();
        res.json(modelRoutes);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error }); }
};

/**
 * Used to add a new modelRoute to the DB.
 * Req body must contain  routeStartingPoint and routeEndingPoint
 * 
 * @respond added modelRoute id 
 */
module.exports.addModelRoute = async (req, res) => {
    try {
        validateKeysInObject(['routeStartingPoint', 'routeEndingPoint'], req.body);
        const newModelRoute = await modelRouteService.addModelRoute(req.body);
        res.status(200).json({ createdModelRouteId: newModelRoute._id ,message: SUCCESS_MESSAGES.POST(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error }); }
};

/**
 * Used to receive a specific modelRoute from the DB.
 * Request has to contain an id param. 
 * 
 * @respond requested modelRoute 
 */
module.exports.getSpecificModelRoute = async (req, res) => {
    try{
        const requestedModelRoute = await modelRouteService.getSpecificModelRoute(req.params.id);
        res.json(requestedModelRoute);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error }); }
};

/**
 * Used to update a specific modelRoute
 * 
 * @respond modelRoute before the update
 */
module.exports.updateSpecificModelRoute = async (req, res) => {
    try{
        validateObjectKeys(['routeStartingPoint', 'routeEndingPoint'], req.body);
        const updatedModelRoute = await modelRouteService.updateSpecificModelRoute(req.params.id, req.body);
        res.status(200).json({ updatedModelRoute, message: SUCCESS_MESSAGES.PATCH(MODEL_NAME)});

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.PATCH(MODEL_NAME), error }); }
};

/**
 * Used to delete a specific modelRoute from the DB.
 * Request has to contain an id param. 
 * 
 * @respond deleted modelRoute
 */
module.exports.deleteSpecificModelRoute = async (req, res) => {
    try{
        const deletedModelRoute = await modelRouteService.deleteSpecificModelRoute(req.params.id);
        res.status(200).json({ deletedModelRoute, message: SUCCESS_MESSAGES.DELETE(MODEL_NAME) });
        
    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.DELETE(MODEL_NAME), error }); }
};








