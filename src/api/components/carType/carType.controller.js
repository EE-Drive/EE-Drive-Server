
const GenericModelController = require('../../../services/genericModelController.util');
const {validateKeysInObject} = require('../../..//services/validations.util');
const carTypeService = require('./carType.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const Logger = require('../../../config/logger.util');

const MODEL_NAME = 'Car Type';
const mustProperties = ['companyName', 'brandName', 'year'];
const allowedPropertiesToUpdate = ['companyName', 'brandName', 'year', 'drivesID', 'modelsID'];
const carTypeController = GenericModelController(MODEL_NAME, carTypeService, mustProperties, allowedPropertiesToUpdate); 


/**
 * Used to add a new Car Type to the DB.
 * 
 * @respond added item id 
 */
carTypeController.addItem = async (req, res) => {
    try{
        Logger.databaseQuery(`adding an item to ${MODEL_NAME} -> ${JSON.stringify(req.body)}`);
        validateKeysInObject(mustProperties, req.body);
        const newItem = mustProperties.reduce((prev, current) => ({...prev, [current]:req.body[current]}), {}); 
        if(req.body.engineDisplacement) newItem.engineDisplacement = req.body.engineDisplacement;
        const savedItem = await carTypeService.addItem(newItem);
        Logger.databaseResult(`added to ${MODEL_NAME} -> ${JSON.stringify(savedItem)}`);
        res.status(200).json({createdItemId:savedItem._id, message:SUCCESS_MESSAGES.POST(MODEL_NAME)});

    } catch (err){
        Logger.databaseError(`Faild to add to ${MODEL_NAME} -> ${err?.message}`);
        res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME)});
    }
}

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