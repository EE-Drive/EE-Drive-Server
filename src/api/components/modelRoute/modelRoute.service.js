
const ModelRouteModel = require('./modelRoute.model');

/**
 * Used to fetch all modelRoutes data from the DB
 * 
 * @resolve modelRoutes data
 */
module.exports.getModelRoutes = () => ModelRouteModel.find();

/**
 * Used to insert a modelRoute to the DB
 * 
 * @param {object} newModelRoute object contains the modelRoute starting and ending points
 * @resolve the created modelRoute
 */
module.exports.addModelRoute = ({routeStartingPoint, routeEndingPoint}) => 
    new ModelRouteModel({routeStartingPoint, routeEndingPoint}).save();

/**
 * Used to fetch a specific modelRoute from the DB.
 * 
 * @param {string} modelRouteId 
 * @resolve requested modelRoute data
 */
module.exports.getSpecificModelRoute = modelRouteId => ModelRouteModel.findById(modelRouteId);

/**
 * Used to updated an existing modelRoute
 * 
 * @param {string} modelRouteId 
 * @param {object} change 
 * @resolve modelRoute before the update
 */
module.exports.updateSpecificModelRoute = (modelRouteId, change) => 
    ModelRouteModel.findByIdAndUpdate(modelRouteId, { $set:change });

/**
 * Used to delete a specific modelRoute from the DB.
 * 
 * @param {string} modelRouteId 
 * @resolve the deleted modelRoute
 */
module.exports.deleteSpecificModelRoute = modelRouteId => 
    ModelRouteModel.findByIdAndDelete(modelRouteId);