

module.exports.SUCCESS_MESSAGES = {
    POST: modelName => `${modelName} added successfully`,
    PATCH: modelName => `${modelName} updated successfully`,
    DELETE: modelName => `${modelName} Deleted successfully`,
};

module.exports.ERROR_MESSAGES = {
    GET: modelName => `Failed to retrieve the requested ${modelName}`,
    PATCH: modelName => `Failed to updated the requested ${modelName}`,
    POST: modelName => `Failed to add the requested ${modelName}`,
    DELETE: modelName => `Failed to Delete the requested ${modelName}`
};