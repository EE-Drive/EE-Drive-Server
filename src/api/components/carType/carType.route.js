
const router = require('express').Router();
const {getCarTypes, addCarType, getSpecificCarType, deleteSpecificCarType, addDriveToSpecificCarType} = require('./carType.controller');
const {addDriveMiddleware} = require('../drive/drive.controller');

// Target All
router.route('/').get(getCarTypes).post(addCarType);

// Target Specific
router.route('/:id').get(getSpecificCarType).post(addDriveMiddleware, addDriveToSpecificCarType).delete(deleteSpecificCarType);



