
const GenericModelService = require('../../../services/genericModelService.util');
const ModelRouteModel = require('./modelRoute.model');
const modelRouteService = GenericModelService(ModelRouteModel);
const OptimalModelService = require('../optimalModel/optimalModel.service');

/**
 * Used to add a model route to the DB.
 * Will build a route rectangle from the given 
 * starting and ending points.
 * 
 * @param {object} newItem 
 */
modelRouteService.addItem = (newItem) => 
    new ModelRouteModel(newItem).save();

modelRouteService.getModel = async ({lat, long, carTypeID}) => {
    const routeId = await module.exports.findRouteId(lat, long);
    return OptimalModelService.modelFromRouteID(routeId, carTypeID);
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
module.exports.isPointInRectangle = ({bL: {lat: Ax, long: Ay}, bR: {lat: Dx, long: Dy},
     tL: {lat: Bx, long: By}, tR: {lat: Cx, long: Cy}}, Px, Py) => {

    const calculateTriangleAreaSum = (Ax, Ay, Bx, By, Cx, Cy) => 
        Math.abs((Bx*Ay - Ax*By) + (Cx*By - Bx*Cy) + (Ax*Cy - Cx*Ay)) / 2;

    const calculateRectangleAreaSum = (Ax, Ay, Bx, By, Dx, Dy) => {
        const width = Math.sqrt(Math.pow((Ax - Bx) ,2) + Math.pow((Ay - By) ,2));
        const height = Math.sqrt(Math.pow((Ax - Dx) ,2) + Math.pow((Ay - Dy) ,2));
        return (width * height);
    }

    const APDSum = calculateTriangleAreaSum(Ax, Ay, Px, Py, Dx, Dy);
    const DPCSum = calculateTriangleAreaSum(Dx, Dy, Px, Py, Cx, Cy);
    const CPBSum = calculateTriangleAreaSum(Cx, Cy, Px, Py, Bx, By);
    const PBASum = calculateTriangleAreaSum(Px, Py, Bx, By, Ax, Ay);
    const rectangleSum = calculateRectangleAreaSum(Ax, Ay, Bx, By, Dx, Dy);
    
    return (APDSum + DPCSum + CPBSum + PBASum) <= rectangleSum;
};

/**
 * Used to find the route id assigned for the current lat and long.
 * 
 * @param {string} lat 
 * @param {string} long 
 */
module.exports.findRouteId = async (lat, long) => {
    if(!lat || !long || isNaN(lat) || isNaN(long)) return null;
    modelRoutes = await modelRouteService.getItems(); 
    
    for(const route of modelRoutes){
        const {bL, bR, tL, tR} = route;
        if(module.exports.isPointInRectangle({bL, bR, tL, tR}, lat, long))
            return route._id;
    }
        
    return null;
};
