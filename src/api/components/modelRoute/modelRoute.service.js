
const ModelRouteModel = require('./modelRoute.model');

/**
 * Used to fetch all modelRoutes data from the DB
 * 
 * @resolve modelRoutes data
 */
module.exports.getModelRoutes = () => {
    return new Promise((resolve, reject) => {
        ModelRouteModel
            .find()
            .then(resolve)
            .catch(reject);
    });
};

/**
 * Used to insert a modelRoute to the DB
 * 
 * @param {object} newModelRoute object contains the modelRoute starting and ending points
 * @resolve the created modelRoute
 */
module.exports.addModelRoute = ({routeStartingPoint, routeEndingPoint}) => {
    return new Promise((resolve, reject) => {
        new ModelRouteModel({routeStartingPoint, routeEndingPoint})
            .save()
            .then(resolve)
            .catch(reject);
    });
};

/**
 * Used to fetch a specific modelRoute from the DB.
 * 
 * @param {string} modelRouteId 
 * @resolve requested modelRoute data
 */
module.exports.getSpecificModelRoute = modelRouteId => {
    return new Promise((resolve, reject) => {
        ModelRouteModel
            .findById(modelRouteId)
            .then(resolve)
            .catch(reject);
    });
};

/**
 * Used to updated an existing modelRoute
 * 
 * @param {string} modelRouteId 
 * @param {object} change 
 * @resolve modelRoute before the update
 */
module.exports.updateSpecificModelRoute = async (modelRouteId, change) => {
    return new Promise((resolve, reject) => {
        ModelRouteModel
            .findByIdAndUpdate(modelRouteId, { $set:change })
            .then(resolve)
            .catch((reject));
    });
};

/**
 * Used to delete a specific modelRoute from the DB.
 * 
 * @param {string} modelRouteId 
 * @resolve the deleted modelRoute
 */
module.exports.deleteSpecificModelRoute = modelRouteId => {
    return new Promise((resolve, reject) => {
        ModelRouteModel
            .findByIdAndDelete(modelRouteId)
            .then(resolve)
            .catch(reject);
    });
};