
const router = require('express').Router();
const carTypeController = require('./carType.controller');
const driveController = require('../drive/drive.controller');
const {validateIdParamMiddleware} = require('../../middleware/validation.middleware');

// Target All
router
    .route('/')
    .get(carTypeController.getCarTypes)
    .post(carTypeController.addCarType);

// Target Specific
router
    .route('/:id')
    .all(validateIdParamMiddleware)
    .get(carTypeController.getSpecificCarType)
    .patch(carTypeController.updateSpecificCarType)
    .post(driveController.addDriveMiddleware, carTypeController.addDriveToSpecificCarType)
    .delete(carTypeController.deleteSpecificCarType);

module.exports = router;