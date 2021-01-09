const router = require("express").Router();
const optimalModelController = require("./optimalModel.controller");
const {
  validateIdParamMiddleware,
} = require("../../middleware/validation.middleware");

// Target All
router
  .route("/")
  .get(optimalModelController.getOptimalModels)
  .post(optimalModelController.addOptimalModel);

// Target Specific
router
  .route("/:id")
  .all(validateIdParamMiddleware)
  .get(optimalModelController.getSpecificOptimalModel)
  .patch(optimalModelController.updateSpecificOptimalModel)
  .delete(optimalModelController.deleteSpecificOptimalModel);

module.exports = router;
