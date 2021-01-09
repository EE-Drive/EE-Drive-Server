const OptimalModelModel = require("./optimalModel.model");

/**
 * Used to fetch all optimalModels data from the DB
 *
 * @resolve optimalModels data
 */
module.exports.getOptimalModels = () => OptimalModelModel.find();

/**
 * Used to insert a optimalModel to the DB
 *
 * @param {object} newOptimalModel object contains the routeID, vertices and edges
 * @param {Date} lastUpdated Date object of the time  the optimal model was created
 * @resolve the created optimalModel
 */
module.exports.addOptimalModel = ({ routeID, vertices, edges }, lastUpdated) =>
  new OptimalModelModel({ routeID, lastUpdated, vertices, edges }).save();

/**
 * Used to fetch a specific optimalModel from the DB.
 *
 * @param {string} optimalModelId
 * @resolve requested optimalModel data
 */
module.exports.getSpecificOptimalModel = (optimalModelId) =>
  OptimalModelModel.findById(optimalModelId);

/**
 * Used to updated an existing optimalModel
 *
 * @param {string} optimalModelId
 * @param {object} change
 * @resolve optimalModel before the update
 */
module.exports.updateSpecificOptimalModel = (optimalModelId, change) =>
  OptimalModelModel.findByIdAndUpdate(optimalModelId, { $set: change });

/**
 * Used to delete a specific optimalModel from the DB.
 *
 * @param {string} optimalModelId
 * @resolve the deleted optimalModel
 */
module.exports.deleteSpecificOptimalModel = (optimalModelId) =>
  OptimalModelModel.findByIdAndDelete(optimalModelId);
