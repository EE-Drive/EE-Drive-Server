
const {findRouteId} = require('../components/modelRoute/modelRoute.service');

/**
 * Formating client request 
 * 
 */
module.exports = async (req, res, next)=> {
    const rawData = req.body.driveRawData;
    const temp = {};
    for(const dataItem of rawData){
        const lat = dataItem.lat;
        const long = dataItem.long;
        const routeId = await findRouteId(lat, long);
        if(!routeId) continue;
        if(!temp[routeId]) temp[routeId] = [];
        temp[routeId].push(dataItem);
    }
    const formatedRawData = Object.keys(temp).map( routeId => ({routeID: routeId, rawData: temp[routeId]}));
    req.body.driveRawData = formatedRawData;
    next();
}