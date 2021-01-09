
const carTypeService = require('./carType.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const {validateKeysInObject, validateObjectKeys} = require('../../../services/validations.util');
const MODEL_NAME = 'Car Type';

/**
 * Used to receive all carTypes from the DB
 * 
 * @respond carTypes array
 */
module.exports.getCarTypes = async (req, res) => {
    try {
        const carTypes = await carTypeService.getCarTypes();
        res.json(carTypes);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error }); }
};

/**
 * Used to add a new carType to the DB.
 * Req body must contain carType companyName, brandName and a year
 * 
 * @respond added carType id 
 */
module.exports.addCarType = async (req, res) => {
    try {
        validateKeysInObject(['companyName', 'brandName', 'year'], req.body);        
        const newCarType = await carTypeService.addCarType(req.body);
        res.status(200).json({ createdCarTypeId: newCarType._id ,message: SUCCESS_MESSAGES.POST(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error }); }
};

/**
 * Used to receive a specific carType from the DB.
 * Request has to contain an id param. 
 * 
 * @respond requested carType 
 */
module.exports.getSpecificCarType = async (req, res) => {
    try{
        const requestedCarType = await carTypeService.getSpecificCarType(req.params.id);
        res.json(requestedCarType);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error }); }
};

/**
 * Used to update a specific carType
 * 
 * @respond carType before the update
 */
module.exports.updateSpecificCarType = async (req, res) => {
    try{
        validateObjectKeys(['companyName', 'brandName', 'year', 'drivesID', 'modelsID'], req.body);
        const updatedCarType = await carTypeService.updateSpecificCarType(req.params.id, req.body);
        res.status(200).json({ updatedCarType, message: SUCCESS_MESSAGES.PATCH(MODEL_NAME)});

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.PATCH(MODEL_NAME), error }); }
};

/**
 * Used to add a drive and its rawData to a specific carType from the DB.
 * Request has to contain an id param and driveId.
 * 
 * @respond added drive id
 */
module.exports.addDriveToSpecificCarType = async (req, res) => {
    try{
        if(!req.driveId) throw new Error('Request must contain driveId');
        await carTypeService.addDriveToSpecificCarType(req.params.id, req.driveId);
        res.status(200).json({ newDriveId: req.driveId, message: SUCCESS_MESSAGES.POST('Drive')})

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error }); }
};

/**
 * Used to delete a specific carType from the DB.
 * Request has to contain an id param. 
 * 
 * @respond deleted carType
 */
module.exports.deleteSpecificCarType = async (req, res) => {
    try{
        const deletedCarType = await carTypeService.deleteSpecificCarType(req.params.id);
        res.status(200).json({ deletedCarType, message: SUCCESS_MESSAGES.DELETE(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.DELETE(MODEL_NAME), error }); }
};








