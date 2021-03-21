
let router = require('express').Router();
const genericModelRouter = require('../../../services/genericModelRouter');
const carTypeController = require('./carType.controller');
const driveController = require('../drive/drive.controller');
const {validateIdParamMiddleware} = require('../../middleware/validation.middleware');
const csvTranslator = require('../../middleware/csvTranslator.middleware');

const multer  = require('multer');
const upload = multer({ dest: 'src/data/csvFiles/' });

router
    .route('/:id')
    .post(driveController.addDriveMiddleware, carTypeController.addDriveToSpecificCarType);

router
    .route('/drive-csv/:id')
    .all(validateIdParamMiddleware)
    .post((req, res) => res.send('hey') ,upload.single('driveDetails'), csvTranslator, driveController.addDriveMiddleware, carTypeController.addDriveToSpecificCarType);

router = genericModelRouter(carTypeController, router);

module.exports = router;