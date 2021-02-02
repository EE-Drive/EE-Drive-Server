
const GenericModelService = require('../../../services/genericModelService.util');
const driveModel = require("./drive.model");
const carTypeService = require("../carType/carType.service");

const driveService = GenericModelService(driveModel);

/**
 * Used to add a drive to the DB.
 * CarType must be created already.
 * CarType drivesArray will not be updated automatically.
 * 
 * @param {object} newItem 
 */
driveService.addItem = async newItem => {
  if(!await carTypeService.isItemExist(newItem.carTypeId)) 
    throw new Error(`Cant find the carType id in the db: ${newItem.carTypeId}`);
  return new driveModel(newItem).save();
};

/**
 * Used to add a drive to a specific drive
 *
 * @param {string} driveId
 * @param {object} driveRawData
 * @resolve the updated drive
 */
driveService.addRouteRawData = (driveId, routeRawData) =>
  driveModel.findByIdAndUpdate(driveId, { $push: { driveRawData: routeRawData }}, {new: true});

module.exports = driveService;