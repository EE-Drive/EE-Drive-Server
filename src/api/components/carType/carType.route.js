
const router = require('express').Router();
const {getCarTypes, addCarType, getSpecificCarType, deleteSpecificCarType, addDriveToSpecificCarType} = require('./carType.controller');

// Target All
router.route('/').get(getCarTypes).post(addCarType);

// Target Specific
router.route('/:id').get(getSpecificCarType).post(addDriveToSpecificCarType).delete(deleteSpecificCarType);



