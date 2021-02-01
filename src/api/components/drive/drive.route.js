const router = require("express").Router();
const driveController = require("../drive/drive.controller");
const {
  validateIdParamMiddleware,
} = require("../../middleware/validation.middleware");

// Target All
router.route("/").get(driveController.getDrives).post(driveController.addDrive);

// Target Specific
router
  .route("/:id")
  .all(validateIdParamMiddleware)
  .get(driveController.getSpecificDrive)
  .patch(driveController.updateSpecificDrive)
  .post(driveController.addRouteRawData)
  .delete(driveController.deleteSpecificDrive);

module.exports = router;
