
const express = require('express');
const {validateIdParamMiddleware} = require('../api/middleware/validation.middleware');

/**
 * Used to create a generic router.
 * 
 * @param {object} modelController 
 */
const GenericModelRouter = (modelController, router = express.Router()) => {

    if(!modelController) return router;

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