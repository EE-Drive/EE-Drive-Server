
/**
 * Used to validate if the given keys exists in the given object.
 * 
 * @param {array} keys 
 * @param {object} object 
 */
module.exports.validateKeysInObject = (keys, object) => {
    const validationResult = keys.every(key => key in object);
    if(!validationResult) throw new Error(`Request body must contain ${keys}`);
};

/**
 * Used to validate if the object contain only the given keys.
 * 
 * @param {array} allowedKeys 
 * @param {object} object 
 */
module.exports.validateObjectKeys = (allowedKeys, object) => {
    const validationResult = Object.keys(object).every(key => allowedKeys.includes(key));
    if(!validationResult) throw new Error(`Request body supports only the following keys ${allowedKeys}`);
};
