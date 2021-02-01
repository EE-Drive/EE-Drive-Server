
const express = require('express');
const GenericModelService = require('./genericModelService.util');
const GenericModelController = require('./genericModelController.util');
const {validateIdParamMiddleware} = require('../api/middleware/validation.middleware');

/**
 * @param {object} model mongoose object
 * @param {string} modelName 
 * @param {[string]} mustProperties 
 * @param {[string]} allowedPropertiesToUpdate 
 * @return {object} express router object with default routes.
 */
const GenericModelRouter = (model, modelName, mustProperties, allowedPropertiesToUpdate) => {

    const router = express.Router();
    const modelService = GenericModelService(model);
    const modelController = GenericModelController(modelName, modelService, mustProperties, allowedPropertiesToUpdate);
    
    router
        .route('/')
        .get(modelController.getItems)
        .post(modelController.addItem);

    router
        .route('/:id')
        .all(validateIdParamMiddleware)
        .get(modelController.getSpecificItem)
        .patch(modelController.updateSpecificItem)
        .delete(modelController.deleteSpecificItem);

    return router;
};

module.exports = GenericModelRouter;