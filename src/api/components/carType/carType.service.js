
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
 * @resolve true if successful
 */
module.exports.addCarType = ({companyName, brandName, year}) => {
    return new Promise((resolve, reject) => {
        new CarTypeModel({companyName, brandName, year})
            .save()
            .then(() => resolve(true))
            .catch(reject);
    });
};

/**
 * Used to fetch a specific carType from the DB.
 * 
 * @param {String} carTypeId 
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
 * Used to add a drive to a specific car type
 * 
 * @param {String} carTypeId 
 * @param {String} driveId 
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
 * @param {*} carTypeId 
 * @resolve true if successful
 */
module.exports.deleteSpecificCarType = carTypeId => {
    return new Promise((resolve, reject) => {
        CarTypeModel
            .findByIdAndDelete(carTypeId)
            .then(() => resolve(true))
            .catch(reject);
    });
};