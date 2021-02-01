
const genericModelRouter = require('../../../services/genericModelRouter');
const driveController = require("./drive.controller");

const router = genericModelRouter(driveController);

router
    .route('/:id')
    .post(driveController.addRouteRawData);

module.exports = router;
