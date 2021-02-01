
const GenericModelService = require('../../../services/genericModelService.util');
const driveModel = require("./drive.model");

const driveService = GenericModelService(driveModel);

/**
 * Used to add a drive to a specific drive
 *
 * @param {string} driveId
 * @param {object} driveRawData
 * @resolve the updated car type
 */
driveService.addRouteRawData = (driveId, routeRawData) =>
  driveModel.findByIdAndUpdate(driveId, { $push: { driveRawData: routeRawData }}, {new: true});

module.exports = driveService;