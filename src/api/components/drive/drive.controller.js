
const GenericModelController = require('../../../services/genericModelController.util');
const driveService = require('./drive.service');
const {validateObjectKeys, validateKeysInObject} = require('../../../services/validations.util');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');

const MODEL_NAME = 'Drive';
const mustProperties = ['carTypeId', 'driveRawData'];
const allowedPropertiesToUpdate = ['driveRawData'];
const driveController = GenericModelController(MODEL_NAME, driveService, mustProperties, allowedPropertiesToUpdate); 

/**
 * Used as a middleware for adding a drive to the DB,
 * and passing its id in the req.driveId paramter.
 */
driveController.addDriveMiddleware = async (req, res, next) => {
  validateKeysInObject(mustProperties, req.body);
  const newItem = mustProperties.reduce((prev, current) => ({...prev, [current]:req.body[current]}), {});   
  const savedItem = await driveService.addItem(newItem);
  req.driveId = savedItem._id;
  next();
};

/**
 * Used to add a rawData to a specific drive from the DB.
 * Request has to contain an id param.
 *
 * @respond added rawData id
 */
driveController.addRouteRawData = async (req, res) => {
  try {
    validateObjectKeys(allowedPropertiesToUpdate, req.body);
    validateObjectKeys(["routeID", "rawData"], req.body.driveRawData);

    const updatedItem = await driveService.addRouteRawData(req.params.id, req.body.driveRawData);

    res.status(200).json({ updatedItem, message: SUCCESS_MESSAGES.POST(MODEL_NAME)});

  } catch (err) { res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error: err.message });}
};

module.exports = driveController;