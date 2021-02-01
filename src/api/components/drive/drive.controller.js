const {
  validateAndReturnParam,
} = require("../../../services/validations.util");
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} = require("../../../services/messages.util");
const driveService = require("./drive.service");
const MODEL_NAME = "Drive";

module.exports.addDriveMiddleware = (req, res, next) => {};

/**
 * Used to receive all drives from the DB
 *
 * @respond drives array
 */
module.exports.getDrives = async (req, res) => {
  try {
    const drives = await driveService.getAllDrives();

    res.json(drives);
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error });
  }
};

/**
 * Used to add a new drive to the DB.
 * Req body must contain drive carTypeId and driveRawData
 *
 * @respond added drive id
 */
module.exports.addDrive = async (req, res) => {
  try {
    validateKeysInObject(["carTypeId", "driveRawData"], req.body);
    const newDrive = await driveService.addDrive(req.body);

    res.status(200).json({
      createdDriveId: newDrive._id,
      message: SUCCESS_MESSAGES.POST(MODEL_NAME),
    });
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error });
  }
};

/**
 * Used to receive a specific drive from the DB.
 * Request has to contain an id param.
 *
 * @respond requested drive
 */
module.exports.getSpecificDrive = async (req, res) => {
  try {
    const requestedDrive = await driveService.getSpecificDrive(req.params.id);

    res.json(requestedDrive);
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error });
  }
};

/**
 * Used to update a specific drive
 *
 * @respond drive before the update
 */
module.exports.updateSpecificDrive = async (req, res) => {
  try {
    validateObjectKeys(["carTypeId", "driveRawData"], req.body);
    const updatedDrive = await driveService.updateSpecificDrive(
      req.params.id,
      req.body
    );

    res
      .status(200)
      .json({ updatedDrive, message: SUCCESS_MESSAGES.PATCH(MODEL_NAME) });
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.PATCH(MODEL_NAME), error });
  }
};

/**
 * Used to add a rawData to a specific drive from the DB.
 * Request has to contain an id param and driveId.
 *
 * @respond added rawData id
 */
module.exports.addRouteRawData = async (req, res) => {
  try {
    validateObjectKeys(["driveRawData"], req.body);
    validateObjectKeys(["routeID", "rawData"], req.body.driveRawData);

    await driveService.addRouteRawData(req.params.id, req.body.driveRawData);

    res.status(200).json({
      newRouteId: req.body.driveRawData.routeID,
      message: SUCCESS_MESSAGES.POST(MODEL_NAME),
    });
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error });
  }
};

/**
 * Used to delete a specific drive from the DB.
 * Request has to contain an id param.
 *
 * @respond deleted drive
 */
module.exports.deleteSpecificDrive = async (req, res) => {
  try {
    const deletedDrive = await driveService.deleteSpecificDrive(req.params.id);

    res
      .status(200)
      .json({ deletedDrive, message: SUCCESS_MESSAGES.DELETE(MODEL_NAME) });
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.DELETE(MODEL_NAME), error });
  }
};
