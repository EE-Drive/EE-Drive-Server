const Edge = require('../src/Dijkstra/Edge');
const Vertex = require('../src/Dijkstra/Vertex');

const getDistance = (xA, yA, xB, yB) => Math.sqrt((xA - xB) * (xA - xB) + (yA - yB) * (yA - yB));

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

module.exports.normalize = (clusters, drives) => {
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

    let vertexIndex = 0;
    const vertexKeys = Object.keys(vertices);
    const edgeKeys = Object.keys(edges);
    vertexKeys.forEach(key => { vertices[key] = vertices[key].map(({ lat, long, speed }) => new Vertex(vertexIndex++, lat, long, speed )); });
    const endVertex = new Vertex(vertexIndex, 0, 0, 0);
    edgeKeys.forEach(key => {
        const [fCluster, tCluster] = key.split('|');
        edges[key] = edges[key].map(({ fuelCon, fromSpeed, toSpeed }) => {
            const fromVertex = vertices[fCluster]?.find(vertex => vertex.speed === fromSpeed);
            const toVertex = vertices[tCluster]?.find(vertex => vertex.speed === toSpeed);
            return new Edge(fromVertex, toVertex ?? endVertex, toVertex ? fuelCon : 0);
        })
    });

    const vRes = Object.values(vertices).flat();
    vRes.push(endVertex);
    const eRes = Object.values(edges).flat();

    return [vRes, eRes];
};