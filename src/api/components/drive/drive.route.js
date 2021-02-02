
let router = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const driveController = require("./drive.controller");
const carTypeController = require("../carType/carType.controller");

router
    .route('/')
    .post(driveController.addDriveMiddleware, carTypeController.addDriveToSpecificCarType);
    
router
    .route('/:id')
    .post(driveController.addRouteRawData);

router = genericModelRouter(driveController, router);

module.exports = router;
