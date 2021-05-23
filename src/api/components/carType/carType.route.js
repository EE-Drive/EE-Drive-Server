
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
    .post(driveController.addDriveMiddleware);

router
    .route('/drive-csv/:id')
    .all(validateIdParamMiddleware)
    .post(upload.single('driveDetails'), csvTranslator, driveController.addDriveMiddleware);


router = genericModelRouter(carTypeController, router);

module.exports = router;