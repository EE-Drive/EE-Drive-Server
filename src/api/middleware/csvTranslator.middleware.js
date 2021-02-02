
const csv = require('csv-parser');
const fs = require('fs');
const {findRouteId} = require('../components/modelRoute/modelRoute.service');

// csv row -> raw data format
const createDriveRawData = async (rawData, csvRow) => {
    const routeId = await findRouteId(csvRow.latitude, csvRow.longitude);
    if(!routeId) return;
    const data = {
        lat: csvRow.Latitude,
        long: csvRow.Longitude,
        fuelCon: csvRow['Fuel Consumption Rate'],
        speed: csvRow.Speed
    };
    if(!rawData[routeId]) rawData[routeId] = [];
    rawData[routeId].push(data);
};

/**
 * Used to Translate csv data to a json drive model format
 * 
 * @throws Error if file is missing
 */
module.exports = (req, res, next)=> {
    if(!req.file) res.status(404).json({message: "cant read the file"});
    const carTypeId = req.params.id;
    const filePath = req.file.path;
    const csvData = [];
    fs.createReadStream(filePath).pipe(csv())
        .on('data', csvRow => csvData.push(csvRow))
        .on('end', async () => {
            const rawData = {};
            for( const csvRow of csvData ) await createDriveRawData(rawData, csvRow);
            const driveRawData = Object.keys(rawData).map(key => ({routeID: key, rawData: rawData[key]}));
            req.body = {carTypeId, driveRawData};
            next();
        });
};