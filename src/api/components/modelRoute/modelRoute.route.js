
const router = require('express').Router();
const modelRouteController = require('./modelRoute.controller');
const {validateIdParamMiddleware} = require('../../middleware/validation.middleware');

// Target All
router
    .route('/')
    .get(modelRouteController.getModelRoutes)
    .post(modelRouteController.addModelRoute);

// Target Specific
router
    .route('/:id')
    .all(validateIdParamMiddleware)
    .get(modelRouteController.getSpecificModelRoute)
    .patch(modelRouteController.updateSpecificModelRoute)
    .delete(modelRouteController.deleteSpecificModelRoute);

module.exports = router;