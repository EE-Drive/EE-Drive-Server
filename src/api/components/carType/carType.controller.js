
const GenericModelController = require('../../../services/genericModelController.util');
const carTypeService = require('./carType.service');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');

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
        if(!req.driveId) throw new Error('Request must contain driveId');
        const updatedItem = await carTypeService.addDriveToSpecificCarType(req.params.id, req.driveId);
        res.status(200).json({ updatedItem, message: SUCCESS_MESSAGES.POST('Drive')})

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error }); }
};

module.exports = carTypeController;