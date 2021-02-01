
const genericModelRouter = require('../../../services/genericModelRouter');
const carTypeModel = require('./carType.model');
const carTypeController = require('./carType.controller');
const driveController = require('../drive/drive.controller');

const modelName = 'Car Type';
const mustProperties = ['companyName', 'brandName', 'year'];
const allowedPropertiesToUpdate = ['companyName', 'brandName', 'year', 'drivesID', 'modelsID'];
const router = genericModelRouter(carTypeModel, modelName, mustProperties, allowedPropertiesToUpdate);

router
    .route('/:id')
    .post(driveController.addDriveMiddleware, carTypeController.addDriveToSpecificCarType);

module.exports = router;