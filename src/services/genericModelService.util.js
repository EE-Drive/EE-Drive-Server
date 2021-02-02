
/**
 * @param {object} Model mongoose model.
 */
const GenericModelService = (Model) => ({
    
    /**
     * Used to check if the item exists in the DB
     * 
     * @param {string} itemId 
     */
    isItemExist(itemId){ return Model.exists({_id:itemId}); },

    /**
     * Used to fetch all items data from the DB.
     * 
     * @resolve items data
     */
    getItems(){ return Model.find(); },

    /**
     * Used to insert an item to the DB.
     * 
     * @param {object} newItem
     * @resolve the created item
     */
    addItem(newItem){ return new Model(newItem).save(); },

    /**
     * Used to fetch a specific item from the DB.
     * 
     * @param {string} itemId
     * @resolve requested item data
     */
    getSpecificItem(itemId){ return Model.findById(itemId); },

    /**
     * Used to updated an existing item.
     * 
     * @param {string} itemId 
     * @param {object} change 
     * @resolve the updated item
     */
    updateSpecificItem(itemId, change){ return Model.findByIdAndUpdate(itemId, { $set:change }, {new:true}); },

    /**
     * Used to delete a specific item from the DB.
     * 
     * @param {string} itemId 
     * @resolve the deleted item
     */
    deleteSpecificItem(itemId){ return Model.findByIdAndDelete(itemId); }

});

module.exports = GenericModelService;