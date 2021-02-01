
const genericModelRouter = require('../../../services/genericModelRouter');
const carTypeController = require('./carType.controller');
const driveController = require('../drive/drive.controller');

const router = genericModelRouter(carTypeController);

router
    .route('/:id')
    .post(driveController.addDriveMiddleware, carTypeController.addDriveToSpecificCarType);

module.exports = router;