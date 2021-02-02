
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('./messages.util');
const {validateKeysInObject, validateObjectKeys} = require('./validations.util');

/**
 * @param {string} modelName
 * @param {object} modelService 
 * @param {[string]} mustProperties properties used to add an item
 * @param {[string]} allowedPropertiesToUpdate properties allowed to update
 */
const GenericModelController = (modelName, modelService, mustProperties, allowedPropertiesToUpdate) => ({

    /**
     * Used to receive all items from the DB
     * 
     * @respond items array
     */
    getItems(req, res){ 
        modelService.getItems()
            .then( items => res.status(200).json(items))
            .catch(err => res.status(400).json({ message: ERROR_MESSAGES.GET(modelName), error: err.message }));
    },

    /**
     * Used to add a new item to the DB.
     * 
     * @respond added item id 
     */
    addItem(req, res){
        validateKeysInObject(mustProperties, req.body);
        const newItem = mustProperties.reduce((prev, current) => ({...prev, [current]:req.body[current]}), {});   
        modelService.addItem(newItem)
            .then( savedItem => res.status(200).json({createdItemId:savedItem._id, message:SUCCESS_MESSAGES.POST(modelName)}))
            .catch(err => res.status(400).json({ message: ERROR_MESSAGES.POST(modelName), error: err.message}));
    },

    /**
     * Used to receive a specific item from the DB.
     * 
     * @respond requested item 
     */
    getSpecificItem(req, res){
        modelService.getSpecificItem(req.params.id)
            .then(requestedItems => res.status(200).json(requestedItems))
            .catch(err => res.status(400).json({ message: ERROR_MESSAGES.GET(modelName), error: err.message }));
    },

    /**
     * Used to update a specific item
     * 
     * @respond updated item
     */
    updateSpecificItem(req, res){
        validateObjectKeys(allowedPropertiesToUpdate, req.body);
        modelService.updateSpecificItem(req.params.id, req.body)
            .then(updatedItem => res.status(200).json({ updatedItem, message: SUCCESS_MESSAGES.PATCH(modelName)}))
            .catch(err => res.status(400).json({ message: ERROR_MESSAGES.PATCH(modelName), error: err.message }));
    },

    /**
     * Used to delete a specific item from the DB.
     * Request has to contain an id param. 
     * 
     * @respond deleted item
     */
    deleteSpecificItem(req, res){
        modelService.deleteSpecificItem(req.params.id)
            .then( deletedItem => res.status(200).json({ deletedItem, message: SUCCESS_MESSAGES.DELETE(modelName) }))
            .catch(err => res.status(400).json({ message: ERROR_MESSAGES.DELETE(modelName), error: err.message }));
    },

});

module.exports = GenericModelController;