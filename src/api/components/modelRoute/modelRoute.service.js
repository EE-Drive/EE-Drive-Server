
const GenericModelService = require('../../../services/genericModelService.util');
const ModelRouteModel = require('./modelRoute.model');
const modelRouteService = GenericModelService(ModelRouteModel);

/**
 * Used to add a model route to the DB.
 * Will build a route rectangle from the given 
 * starting and ending points.
 * 
 * @param {object} newItem 
 */
modelRouteService.addItem = (newItem) => {
    const newRoute = {
        ...newItem,
        rectangle: buildRectangle(newItem.routeStartingPoint,newItem.routeEndingPoint)
    };
    return new ModelRouteModel(newRoute).save();
};

module.exports = modelRouteService;

/**
 * Used to check if a given point represented with the
 * lat and long are within the rectangle borders.
 * 
 * @param {object} rectangle 
 * @param {string} lat 
 * @param {string} long 
 */
module.exports.isPointInRectangle = (rectangle, lat, long) => {
    if(lat <= rectangle.bL.lat || lat >= rectangle.tR.lat)
        return false;
    if(long <= rectangle.bL.long || long >= rectangle.tR.long)
        return false;
    return true;
};

let modelRoutes;
/**
 * Used to find the route id assigned for the current lat and long.
 * 
 * @param {string} lat 
 * @param {string} long 
 */
module.exports.findRouteId = async (lat, long) => {
    if(!modelRoutes) modelRoutes = await modelRouteService.getItems(); 
    for(const {_id, rectangle} of modelRoutes)
        if(module.exports.isPointInRectangle(rectangle, lat, long))
            return _id;
    return null;
};

// Build rectangle from a given starting point and ending point
const buildRectangle = (sPoint, ePoint) => {
    const {lat:sLat, long:sLong} = sPoint;
    const {lat:eLat, long:eLong} = ePoint;
    const latRes = sLat - eLat;
    const longRes = sLong - eLong;

    if(latRes > 0){ 
        if(longRes > 0)
            return {tL:{lat:eLat, long:sLong}, tR:sPoint, bL:ePoint, bR:{lat:sLat, long:eLong}};
        
        return {tL:ePoint, tR:{lat:sLat, long:eLong}, bL:{lat:eLat, long:sLong}, bR:sPoint};
    }
    if(longRes > 0)
        return {tL:sPoint, tR:{lat:eLat, long:sLong}, bL:{lat:sLat, long:eLong}, bR:ePoint};
        
    return {tL:{lat:sLat, long:eLong}, tR:ePoint, bL:sPoint, bR:{lat:eLat, long:sLong}};
};