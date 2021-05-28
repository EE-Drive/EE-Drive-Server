
const GenericModelService = require('../../../services/genericModelService.util');
const driveModel = require("./drive.model");
const carTypeService = require("../carType/carType.service");

const driveService = GenericModelService(driveModel);

/**
 * Used to add a drive to the DB.
 * CarType must be created already.
 * CarType drivesArray will not be updated automatically.
 * 
 * @param {object} newItem 
 */
driveService.addItem = async newItem => {
  if(!await carTypeService.isItemExist(newItem.carTypeId)) 
    throw new Error(`Cant find the carType id in the db: ${newItem.carTypeId}`);
  return new driveModel(newItem).save();
};

/**
 * Used to add a drive to a specific drive
 *
 * @param {string} driveId
 * @param {object} driveRawData
 * @resolve the updated drive
 */
driveService.addRouteRawData = (driveId, routeRawData) =>
  driveModel.findByIdAndUpdate(driveId, { $push: { driveRawData: routeRawData }}, {new: true});

const avg = arr => {
  if(!Array.isArray(arr)) return arr;
  else return arr.reduce((prev, current) => prev + Number(current), 0) / arr.length;
}

const extractData = (drives, routeID) => {
  const data = [];
  drives.forEach(drive => {
      drive.driveRawData.forEach(driveRawData => {
        if(driveRawData.routeID !== routeID) return;
        driveRawData.rawData.forEach(routeRawData => {
          const fuelCon = routeRawData?.fuelCon ?? routeRawData?.fuelCons;
          const speed = routeRawData?.speed ?? routeRawData?.speeds;
          data.push({...routeRawData, fuelCon: Number(avg(fuelCon)) ,speed: Number(avg(speed))})
        })
      })
  });
  return data;
};

driveService.getDrivesDataForSpecificRoute = (routeID, carTypeId) => 
  driveModel
    .aggregate([
      {$match: {'driveRawData.routeID': routeID}},
      {$project: {
          carTypeId,
          driveRawData: {$filter: {
              input: '$driveRawData',
              as: 'driveRawData',
              cond: {$eq: ['$$driveRawData.routeID', routeID]}
          }},
      }}])
    .then(drives => drives.filter(drive => drive.carTypeId === carTypeId))
    .then(drives => extractData(drives, routeID));

driveService.getDrivesFromCatType = (carTypeId) => driveModel.find({carTypeId}).then((res) => res.reduce((prev, {_id, createdAt, driverAssist}) => [...prev, {_id, createdAt, driverAssist}], []));

module.exports = driveService;