const driveModel = require("./drive.model");

/**
 * Used to fetch all drives data from the DB
 *
 * @resolve drives data
 */
module.exports.getAllDrives = () => driveModel.find();

/**
 * Used to insert a drive to the DB
 *
 * @param {object} newDrive object contains the drive carTypeId and driveRawData
 * @resolve the created drive
 */
module.exports.addDrive = ({ carTypeId, driveRawData }) =>
  new driveModel({ carTypeId, driveRawData }).save();

/**
 * Used to fetch a specific drive from the DB.
 *
 * @param {string} driveId
 * @resolve requested drive data
 */
module.exports.getSpecificDrive = (driveId) => driveModel.findById(driveId);

/**
 * Used to updated an existing drive
 *
 * @param {string} driveId
 * @param {object} change
 * @resolve drive before the update
 */
module.exports.updateSpecificDrive = async (driveId, change) =>
  driveModel.findByIdAndUpdate(driveId, { $set: change });

/**
 * Used to add a drive to a specific drive
 *
 * @param {string} driveId
 * @param {object} driveRawData
 * @resolve the updated car type
 */
module.exports.addRouteRawData = (driveId, routeRawData) =>
  driveModel.findByIdAndUpdate(driveId, {
    $push: { driveRawData: routeRawData },
  });

/**
 * Used to delete a specific drive from the DB.
 *
 * @param {string} driveId
 * @resolve the deleted car type
 */
module.exports.deleteSpecificDrive = (cdriveId) =>
  driveModel.findByIdAndDelete(driveId);
