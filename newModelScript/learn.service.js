const axios = require('axios');
const { extractData } = require("./util");

const LEARN_URL = 'http://localhost:8000/items/';

function getDistance(xA, yA, xB, yB) {
	var xDiff = xA - xB; 
	var yDiff = yA - yB;

	return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

const findNearestIndex = (clusters, drive) => clusters.map(({ lat_centroid, long_centroid }, index) => {
    let minIndex = 0;
    let minDist = Infinity;
    drive.forEach(({ lat, long }, index) => {
        const distance = getDistance(lat_centroid, long_centroid, lat, long);
        if(minDist < distance) return;
        minIndex = index;
        minDist = distance;
    })
    return [minIndex, index];
});

const createVertexRoute = (nearestIndexes, drive, clusters) => {
    const route = [];
    for(let i = 0; i <= nearestIndexes.length - 1; i++) {
        if (i + 1 === nearestIndexes.length) break;
        const clusterIndex = nearestIndexes[i][1];
        const middleDrives = drive.slice(nearestIndexes[i][0], nearestIndexes[i + 1][0]);
        const { lat_centroid: lat, long_centroid: long } = clusters[clusterIndex];
        const speed = drive[nearestIndexes[i][0]].speed;
        const fuelCon = middleDrives.length <= 1
            ? drive[nearestIndexes[i][0]].fuelCon 
            : middleDrives.reduce((p, c) => p + Number(c.fuelCon), 0) - drive[nearestIndexes[i][0]].fuelCon;
        route.push({ lat, long, clusterIndex, speed, fuelCon });
    }
    return route;
};

const normalizeData = (clusters, drives) => {
    const vertices = {};
    const edges = {};
    drives.forEach(drive => {
        const nearestIndexes = findNearestIndex(clusters, drive);
        const vertexRoute = createVertexRoute(nearestIndexes, drive, clusters);
        vertexRoute.forEach(({ clusterIndex, lat, long, speed, fuelCon }, index) => {
            const vertex = { lat, long, speed };
            const toSpeed = vertexRoute[index+1]?.speed ?? speed;
            const edge = { fromSpeed: speed, toSpeed, fuelCon };
            const [vKey, eKey] = [clusterIndex, `${clusterIndex}|${clusterIndex+1}`];

            if(!vertices[vKey]) vertices[vKey] = [vertex];
            else if (!vertices[vKey].find(item => item.speed === speed)) vertices[vKey].push(vertex);

            if(!edges[eKey]) edges[eKey] = [edge];
            else {
                const findRes = edges[eKey].find(({ fromSpeed, toSpeed }) => fromSpeed === speed && toSpeed === toSpeed);
                if (!findRes) edges[eKey].push(edge);
                else if(findRes.fuelCon > fuelCon) findRes.fuelCon = fuelCon;
            }
        });
    });
    return [vertices, edges];
};

module.exports.learn = (dataToLearn, dataForNormalize) => axios
    .post(LEARN_URL, { rawdata: dataToLearn })
    .then(extractData)
    .then((data) => normalizeData(data, dataForNormalize));
