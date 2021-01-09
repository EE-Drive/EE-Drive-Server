
const CarTypeModel = require('./carType.model');

/**
 * Used to fetch all carTypes data from the DB
 * 
 * @resolve carTypes data
 */
module.exports.getCarTypes = () => {
    return new Promise((resolve, reject) => {
        CarTypeModel
            .find()
            .then(resolve)
            .catch(reject);
    });
};

/**
 * Used to insert a cartType to the DB
 * 
 * @param {object} newCarType object contains the carType companyName, brandName and year
 * @resolve the created car type
 */
module.exports.addCarType = ({companyName, brandName, year}) => {
    return new Promise((resolve, reject) => {
        new CarTypeModel({companyName, brandName, year})
            .save()
            .then(resolve)
            .catch(reject);
    });
};

/**
 * Used to fetch a specific carType from the DB.
 * 
 * @param {string} carTypeId 
 * @resolve requested carType data
 */
module.exports.getSpecificCarType = carTypeId => {
    return new Promise((resolve, reject) => {
        CarTypeModel
            .findById(carTypeId)
            .then(resolve)
            .catch(reject);
    });
};

/**
 * Used to updated an existing carType
 * 
 * @param {string} carTypeId 
 * @param {object} change 
 * @resolve car type before the update
 */
module.exports.updateCarType = async (carTypeId, change) => {
    return new Promise((resolve, reject) => {
        CarTypeModel
            .findByIdAndUpdate(carTypeId, { $set:change })
            .then(resolve)
            .catch((reject));
    });
};

/**
 * Used to add a drive to a specific car type
 * 
 * @param {string} carTypeId 
 * @param {string} driveId 
 * @resolve the updated car type
 */
module.exports.addDriveToSpecificCarType = (carTypeId, driveId) => {
    return new Promise((resolve, reject) => {
        CarTypeModel
            .findByIdAndUpdate(carTypeId, { $push:{ drivesID: driveId } })
            .then(resolve)
            .catch(reject);
    });
};

/**
 * Used to delete a specific car type from the DB.
 * 
 * @param {string} carTypeId 
 * @resolve the deleted car type
 */
module.exports.deleteSpecificCarType = carTypeId => {
    return new Promise((resolve, reject) => {
        CarTypeModel
            .findByIdAndDelete(carTypeId)
            .then(resolve)
            .catch(reject);
    });
};