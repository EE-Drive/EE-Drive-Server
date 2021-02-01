const optimalModelService = require("./optimalModel.service");
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} = require("../../../services/messages.util");
const {
  validateKeysInObject,
  validateObjectKeys,
} = require("../../../services/validations.util");
const MODEL_NAME = "Optimal Model";

/**
 * Used to receive all optimalModels from the DB
 *
 * @respond optimalModels array
 */
module.exports.getOptimalModels = async (req, res) => {
  try {
    const optimalModels = await optimalModelService.getOptimalModels();

    res.json(optimalModels);
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error });
  }
};

/**
 * Used to add a new optimalModel to the DB.
 * Req body must contain  routeStartingPoint and routeEndingPoint
 *
 * @respond added optimalModel id
 */
module.exports.addOptimalModel = async (req, res) => {
  try {
    validateKeysInObject(["routeID", "vertices", "edges"], req.body);
    const newOptimalModel = await optimalModelService.addOptimalModel(req.body, new Date());

    res.status(200).json({
      createdOptimalModelId: newOptimalModel._id,
      message: SUCCESS_MESSAGES.POST(MODEL_NAME),
    });
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error });
  }
};

/**
 * Used to receive a specific optimalModel from the DB.
 * Request has to contain an id param.
 *
 * @respond requested optimalModel
 */
module.exports.getSpecificOptimalModel = async (req, res) => {
  try {
    const requestedOptimalModel = await optimalModelService.getSpecificOptimalModel(
      req.params.id
    );

    res.json(requestedOptimalModel);
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error });
  }
};

/**
 * Used to update a specific optimalModel
 *
 * @respond optimalModel before the update
 */
module.exports.updateSpecificOptimalModel = async (req, res) => {
  try {
    validateObjectKeys(["routeID", "vertices", "edges"], req.body);
    const updatedOptimalModel = await optimalModelService.updateSpecificOptimalModel(
      req.params.id,
      req.body
    );

    res.status(200).json({
      updatedOptimalModel,
      message: SUCCESS_MESSAGES.PATCH(MODEL_NAME),
    });
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.PATCH(MODEL_NAME), error });
  }
};

/**
 * Used to delete a specific optimalModel from the DB.
 * Request has to contain an id param.
 *
 * @respond deleted optimalModel
 */
module.exports.deleteSpecificOptimalModel = async (req, res) => {
  try {
    const deletedOptimalModel = await optimalModelService.deleteSpecificOptimalModel(
      req.params.id
    );

    res.status(200).json({
      deletedOptimalModel,
      message: SUCCESS_MESSAGES.DELETE(MODEL_NAME),
    });
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.DELETE(MODEL_NAME), error });
  }
};
