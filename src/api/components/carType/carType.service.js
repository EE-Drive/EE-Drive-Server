
const GenericModelService = require('../../../services/genericModelService.util');
const CarTypeModel = require('./carType.model');

const carTypeService = GenericModelService(CarTypeModel);

/**
 * Used to add a drive to a specific car type
 * 
 * @param {string} carTypeId 
 * @param {string} driveId 
 * @resolve the updated car type
 */
carTypeService.addDriveToSpecificCarType = (carTypeId, driveId) => 
    CarTypeModel.findByIdAndUpdate(carTypeId, { $push:{ drivesID: driveId }}, {new: true});

module.exports = carTypeService;