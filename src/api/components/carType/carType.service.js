
const CarTypeModel = require('./carType.model');

/**
 * Used to fetch all carTypes data from the DB
 * 
 * @resolve carTypes data
 */
module.exports.getCarTypes = () => CarTypeModel.find();

/**
 * Used to insert a cartType to the DB
 * 
 * @param {object} newCarType object contains the carType companyName, brandName and year
 * @resolve the created car type
 */
module.exports.addCarType = ({companyName, brandName, year}) => 
    new CarTypeModel({companyName, brandName, year}).save();

/**
 * Used to fetch a specific carType from the DB.
 * 
 * @param {string} carTypeId 
 * @resolve requested carType data
 */
module.exports.getSpecificCarType = carTypeId => CarTypeModel.findById(carTypeId);

/**
 * Used to updated an existing carType
 * 
 * @param {string} carTypeId 
 * @param {object} change 
 * @resolve car type before the update
 */
module.exports.updateSpecificCarType = async (carTypeId, change) => 
    CarTypeModel.findByIdAndUpdate(carTypeId, { $set:change });

/**
 * Used to add a drive to a specific car type
 * 
 * @param {string} carTypeId 
 * @param {string} driveId 
 * @resolve the updated car type
 */
module.exports.addDriveToSpecificCarType = (carTypeId, driveId) => 
    CarTypeModel.findByIdAndUpdate(carTypeId, { $push:{ drivesID: driveId } });

/**
 * Used to delete a specific car type from the DB.
 * 
 * @param {string} carTypeId 
 * @resolve the deleted car type
 */
module.exports.deleteSpecificCarType = carTypeId => CarTypeModel.findByIdAndDelete(carTypeId);