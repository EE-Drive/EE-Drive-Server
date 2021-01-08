
/**
 * Used to validate the existence of an id in the request params
 * 
 * @throws missing param message
 * @returns id param value
 */
module.exports.validateAndReturnParam = req => {
    if(!req.params.id)
        throw new Error('An id param is missing');
     
    return req.params.id;
}