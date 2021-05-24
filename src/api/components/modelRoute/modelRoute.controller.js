
const GenericModelController = require('../../../services/genericModelController.util');
const modelRouteService = require('./modelRoute.service');
const driveService = require('../drive/drive.service');
const OptimalModelService = require('../optimalModel/optimalModel.service');
const axios = require('axios');
const Vertex = require('../../../Dijkstra/Vertex');
const Edge = require('../../../Dijkstra/Edge');
const Graph = require('../../../Dijkstra/Graph');

const MODEL_NAME = 'Model Route';
const mustProperties = ['bL', 'bR', 'tL', 'tR'];
const modelRouteController = GenericModelController(MODEL_NAME, modelRouteService, mustProperties, mustProperties); 

modelRouteController.addFromForm = async (req,res) => {
    const {bLLat, bLLong, bRLat, bRLong, tLLat, tLLong, tRLat, tRLong} = req.body;
    const item = await modelRouteService.addItem({
        bL:{lat: bLLat, long: bLLong}, 
        bR:{lat: bRLat, long: bRLong},
        tL: {lat: tLLat, long: tLLong}, 
        tR:{lat: tRLat, long: tRLong}, 
    })
    res.render('index');
};

const divideToClusters = model => model.reduce((prev, current, index) => {
    const res = [...prev];
    const { cluster_lable:label, 'speed intervals': speed,
     'speed interval avg fuelCon': fuelCon, 'lat_centroid':lat, 'long_centroid':long} = current;

    if(!res[label]) 
        res[label] = [];

    res[label].push({ fuelCon, vertex: new Vertex(index, lat, long, speed)});
    console.log(res);
    return res;
}, []);

modelRouteController.createModelForRote = async (req, res) => {
    const {routeID, carTypeID} = req.body;
    const current = await OptimalModelService.modelFromRouteID(routeID);
    const data = await driveService.getDrivesDataForSpecificRoute(routeID, carTypeID);
    const model = await axios.post('http://localhost:8001/items/', {rawdata: data}).then(res => res.data);
    const clusters = divideToClusters(model);
    const vertexList = clusters.reduce((prev, curr) => curr ? [...prev, ...curr.map(({vertex}) => vertex)] : prev ,[]);
    const edgeList = [];
    for(let i=0; i < clusters.length - 1; i++)
        clusters[i].forEach(({vertex:v1, fuelCon:f1}) => 
            clusters[i+1].forEach(({vertex:v2}) => edgeList.push(new Edge(v1, v2, f1)))
        );
    
    const target = new Vertex(vertexList.length,0, 0, 0);
    vertexList.push(target);
    clusters[clusters.length - 1].forEach(({vertex:v1, fuelCon:f1}) => edgeList.push(new Edge(v1, target, f1)));
    const graph = new Graph(vertexList, edgeList);
    graph.dikstra(target, true);

    let savedItem;
    if(current.length < 1) 
        savedItem = await OptimalModelService.addItem({
            carTypeID,
            routeID,
            lastUpdated: new Date().getTime(), 
            vertices: graph.vertexList,
            edges: graph.edgeList
        })
    else {
        savedItem = await OptimalModelService.updateSpecificItem(current._id, {
            carTypeID,
            routeID,
            lastUpdated: new Date().getTime(), 
            vertices: graph.vertexList,
            edges: graph.edgeList
        });
    } 
    
    res.json(savedItem);
};

module.exports = modelRouteController;






