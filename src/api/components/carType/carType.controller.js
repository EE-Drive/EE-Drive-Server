
const carTypeService = require('./carType.service');
const {validateAndReturnParam} = require('../../../services/validations.util');
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('../../../services/messages.util');
const MODEL_NAME = 'Car Type';

/**
 * Used to receive all carTypes from the DB
 * 
 * @respond json with the carTypes or failure message
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
 * @respond success or failure message
 */
module.exports.addCarType = async (req, res) => {
    try {
        const validationResult = ['companyName', 'brandName', 'year'].every(key => key in req.body);
        if(!validationResult)
            throw new Error('Request body must contain the car company brand and year');
        
        await carTypeService.addCarType(req.body);
        
        res.status(200).json({ message: SUCCESS_MESSAGES.POST(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.POST(MODEL_NAME), error }); }
};

/**
 * Used to receive a specific carType from the DB.
 * Request has to contain an id param. 
 * 
 * @respond json with the requested carType or failure message
 */
module.exports.getSpecificCarType = async (req, res) => {
    try{
        const requestedCarType = await carTypeService.getSpecificCarType(validateAndReturnParam(req));
        
        res.json(requestedCarType);

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.GET(MODEL_NAME), error }); }
};

/**
 * Used to add a drive and its rawData to a specific carType from the DB.
 * Request has to contain an id param.
 * 
 * @respond success or failure message
 */
module.exports.addDriveToSpecificCarType = (req, res) => {
    

};

/**
 * Used to delete a specific carType from the DB.
 * Request has to contain an id param. 
 * 
 * @respond success or failure message
 */
module.exports.deleteSpecificCarType = async (req, res) => {
    try{
        await carTypeService.deleteSpecificCarType(validateAndReturnParam(req));
        
        res.status(200).json({ message: SUCCESS_MESSAGES.DELETE(MODEL_NAME) });

    } catch (error) { res.status(400).json({ message: ERROR_MESSAGES.DELETE(MODEL_NAME), error }); }
};








