
let router = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const driveController = require('./drive.controller');
const attachRoutesToRawData = require('../../middleware/attachRoutesToRawData')
const addRawData = require('../../middleware/addRawData')

router
    .route('/')
    .post(addRawData, attachRoutesToRawData, driveController.addDriveMiddleware);
    
router
    .route('/:id')
    .post(addRawData, attachRoutesToRawData, driveController.addRouteRawData);

router
    .route('/from-car-type/:id')
    .get(driveController.getDrivesFromCatType);

router = genericModelRouter(driveController, router);

module.exports = router;
