
const GenericModelController = require('../../../services/genericModelController.util');
const carTypeService = require('./carType.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const Logger = require('../../../config/logger.util');

const MODEL_NAME = 'Car Type';
const mustProperties = ['companyName', 'brandName', 'year'];
const allowedPropertiesToUpdate = ['companyName', 'brandName', 'year', 'drivesID', 'modelsID'];
const carTypeController = GenericModelController(MODEL_NAME, carTypeService, mustProperties, allowedPropertiesToUpdate); 

/**
 * Used to add a drive and its rawData to a specific carType from the DB.
 * Request has to contain an id param and driveId.
 * 
 * @respond added drive id
 */
carTypeController.addDriveToSpecificCarType = async (req, res) => {
    try{
        Logger.databaseQuery(`Adding drive ${req.driveId} to ${req.params.id}`);
        if(!req.driveId) throw new Error('Request must contain driveId');
        const updatedItem = await carTypeService.addDriveToSpecificCarType(req.params.id ?? req.body.carTypeId, req.driveId);
        Logger.databaseResult(`drive added successfuly`);
        res.status(200).json({ driveId: req.driveId, updatedItem, message: SUCCESS_MESSAGES.POST('Drive')})

    } catch (error) { 
        Logger.databaseError(`Failed to add drive to ${req.params.id} -> ${error.message}`);
        res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME)}); 
    }
};

module.exports = carTypeController;