
const GenericModelController = require('../../../services/genericModelController.util');
const driveService = require('./drive.service');
const {validateObjectKeys, validateKeysInObject} = require('../../../services/validations.util');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const Logger = require('../../../config/logger.util');

const MODEL_NAME = 'Drive';
const mustProperties = ['carTypeId', 'driveRawData', 'driverAssist'];
const allowedPropertiesToUpdate = ['driveRawData', 'driverAssist'];
const driveController = GenericModelController(MODEL_NAME, driveService, mustProperties, allowedPropertiesToUpdate); 

/**
 * Used as a middleware for adding a drive to the DB,
 * and passing its id in the req.driveId paramter.
 */
driveController.addDriveMiddleware = async (req, res, next) => {
  try{
    Logger.databaseQuery(`Adding drive to drives -> ${JSON.stringify(req.body)}`);
    validateKeysInObject(mustProperties, req.body);
    const newItem = mustProperties.reduce((prev, current) => ({...prev, [current]:req.body[current]}), {});   
    const savedItem = await driveService.addItem(newItem);
    Logger.databaseResult(`drive added successfully -> ${JSON.stringify(savedItem)}`);
    res.status(200).json({ createdItemId:savedItem._id, message: SUCCESS_MESSAGES.POST('Drive')})

  } catch (error) { 
      Logger.databaseError(`Failed to add drive -> ${error.message}`);
      res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME)}); 
  }
  // req.driveId = savedItem._id;
  // next();
};

/**
 * Used to add a rawData to a specific drive from the DB.
 * Request has to contain an id param.
 *
 * @respond added rawData id
 */
driveController.addRouteRawData = async (req, res) => {
  try {
    Logger.databaseQuery(`Adding raw data to ${req.params.id} drive -> ${JSON.stringify(req.body)}`);
    validateObjectKeys(allowedPropertiesToUpdate, req.body);
    const updatedItem = await driveService.addRouteRawData(req.params.id, req.body.driveRawData);
    Logger.databaseResult(`drive ${req.params.id} updated successfuly`);
    res.status(200).json({ updatedItem, message: SUCCESS_MESSAGES.POST(MODEL_NAME)});

  } catch (err) { 
    Logger.databaseError(`Failed to udpated drive ${req.params.id} -> ${error.message}`);
    res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME)});
  }
};

driveController.getDrivesFromCatType = async (req, res) => {
  try {
    const items = await driveService.getDrivesFromCatType(req?.params?.id);
    res.status(200).json({ items});

  } catch (err) { 
    res.status(400).json({ message: err.message});
  }
}

module.exports = driveController;