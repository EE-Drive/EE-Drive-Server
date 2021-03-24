
const RawData = require('../components/drive/rawData.model');

/**
 * adding request to rawData
 * 
 */
module.exports = async (req, res, next)=> {
    await new RawData({JSON: req.body}).save();
    next();
}