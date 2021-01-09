
/**
 * Used to validate the existence of an id in the request params
 * 
 * @throws missing param message
 */
module.exports.validateIdParamMiddleware = (req, res, next)=> {
    if(!req.params.id) return res.status(400).json({message: 'An id param is missing'});
    next();
}