const axios = require('axios');
const { filterByCarType, extractData, avg } = require("./util");

const DRIVE_URL = 'http://eedrive.cs.colman.ac.il/api/drive';

const fixData = (data, id) => {
    const fixedData = [];
    data.forEach(({ driveRawData }) => {
        if (!driveRawData) return;
        driveRawData.forEach(({ routeID, rawData }) => {
            if (routeID !== id) return;
            rawData.forEach(({ fuelCon, fuelCons, speed, speeds, lat, long }) => {
                fixedData.push({ lat, long, fuelCon: Number(avg(fuelCon ?? fuelCons)), speed: Number(avg(speed ?? speeds)) ?? 0 });
            });
         })
    });
    return fixedData;
};

const fixDataForNormalize = (data, id) => {
    const fixedData = [];
    data.forEach(({ driveRawData }) => {
        const drive = [];
        if (!driveRawData) return;
        driveRawData.forEach(({ routeID, rawData }) => {
            if (routeID !== id) return;
            rawData.forEach(({ fuelCon, fuelCons, speed, speeds, lat, long }) => {
                drive.push({ lat, long, fuelCon: Number(avg(fuelCon ?? fuelCons)), speed: Number(avg(speed ?? speeds)) ?? 0 });
            });
        })
        fixedData.push(drive);
    });
    return fixedData.filter(item => item.length >= 1);
};

const fetchDrives = (carTypeID) => axios.get(DRIVE_URL).then(extractData).then((data) => filterByCarType(data, carTypeID));

module.exports.getRelevantData = (routeID, carTypeID) => fetchDrives(carTypeID).then((data) => fixData(data, routeID));

module.exports.getRelevantDataForNormalize = (routeID, carTypeID) => fetchDrives(carTypeID).then((data) => fixDataForNormalize(data, routeID));