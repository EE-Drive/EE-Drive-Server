
const {SUCCESS_MESSAGES, ERROR_MESSAGES} = require('./messages.util');
const {validateKeysInObject, validateObjectKeys} = require('./validations.util');
const Logger = require('../config/logger.util');

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
        Logger.databaseQuery(`Getting all items from ${modelName}`);
        modelService.getItems()
            .then( items => {Logger.databaseResult(`All ${modelName}`); res.status(200).json(items);})
            .catch(err => res.status(400).json({ message: ERROR_MESSAGES.GET(modelName)}));
    },

    /**
     * Used to add a new item to the DB.
     * 
     * @respond added item id 
     */
    async addItem(req, res){
        try{
            Logger.databaseQuery(`adding an item to ${modelName} -> ${JSON.stringify(req.body)}`);
            validateKeysInObject(mustProperties, req.body);
            const newItem = mustProperties.reduce((prev, current) => ({...prev, [current]:req.body[current]}), {});   
            const savedItem = await modelService.addItem(newItem);
            Logger.databaseResult(`added to ${modelName} -> ${JSON.stringify(savedItem)}`);
            res.status(200).json({createdItemId:savedItem._id, message:SUCCESS_MESSAGES.POST(modelName)});\

        } catch (err){
            Logger.databaseError(`Faild to add to ${modelName} -> ${err?.message}`);
            res.status(400).json({ message: ERROR_MESSAGES.POST(modelName)});
        }
    },

    /**
     * Used to receive a specific item from the DB.
     * 
     * @respond requested item 
     */
    async getSpecificItem(req, res){
        try{
            Logger.databaseQuery(`getting ${req.params.id} from ${modelName}`);
            const requestedItems = await modelService.getSpecificItem(req.params.id);
            Logger.databaseResult(JSON.stringify(requestedItems));
            res.status(200).json(requestedItems);

        } catch (err){
            Logger.databaseError(`Faild to retriev ${req.params.id} from ${modelName} -> ${err?.message}`);
            res.status(400).json({ message: ERROR_MESSAGES.GET(modelName)});
        }
    },

    /**
     * Used to update a specific item
     * 
     * @respond updated item
     */
    async updateSpecificItem(req, res){
        try{
            Logger.databaseQuery(`updating ${req.params.id} from ${modelName} -> ${JSON.stringify(req.body)}`);
            validateObjectKeys(allowedPropertiesToUpdate, req.body);
            const updatedItem = await modelService.updateSpecificItem(req.params.id, req.body);
            Logger.databaseResult(`item updated ${JSON.stringify(updatedItem)}`);
            res.status(200).json({ updatedItem, message: SUCCESS_MESSAGES.PATCH(modelName)});

        } catch (err){
            Logger.databaseError(`Faild to update ${req.params.id} -> ${err?.message}`);
            res.status(400).json({ message: ERROR_MESSAGES.PATCH(modelName)});
        }
    },

    /**
     * Used to delete a specific item from the DB.
     * Request has to contain an id param. 
     * 
     * @respond deleted item
     */
    deleteSpecificItem(req, res){
        try{
            Logger.databaseQuery(`deleting ${req.params.id} from ${modelName}`);
            const deletedItem = await modelService.deleteSpecificItem(req.params.id);
            Logger.databaseResult(`${req.params.id} deleted successfuly from ${modelName}`);
            res.status(200).json({ deletedItem, message: SUCCESS_MESSAGES.DELETE(modelName) })

        } catch (err){
            Logger.databaseError(`Faild to delete ${req.params.id} -> ${err?.message}`);
            res.status(400).json({ message: ERROR_MESSAGES.DELETE(modelName)})
        }
    },

});

module.exports = GenericModelController;