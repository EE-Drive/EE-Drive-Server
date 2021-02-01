
const express = require('express');
const {validateIdParamMiddleware} = require('../api/middleware/validation.middleware');

/**
 * @param {object} model mongoose object
 * @param {string} modelName 
 * @param {[string]} mustProperties 
 * @param {[string]} allowedPropertiesToUpdate 
 * @return {object} express router object with default routes.
 */
const GenericModelRouter = modelController => {

    const router = express.Router();

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