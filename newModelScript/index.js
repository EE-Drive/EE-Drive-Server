const { default: axios } = require('axios');
const Graph = require('../src/Dijkstra/Graph');
const { getRelevantData, getRelevantDataForNormalize } = require('./eedrive.service');
const { learn } = require('./learn.service');
const { normalize } = require('./normalize.service');

const OPTIMAL_MODEL_URL = 'http://eedrive.cs.colman.ac.il/api/optimal-model';

async function createModelForRoute(routeID, carTypeID) {
  const learningResult = await learn(await getRelevantData(routeID, carTypeID));
  const [vertexList, edgeList] = normalize(learningResult, await getRelevantDataForNormalize(routeID, carTypeID));
  const graph = new Graph(vertexList, edgeList);
  graph.dikstra(vertexList[vertexList.length - 1], true);
  const itemToAdd = { 
    carTypeID,
    routeID,
    lastUpdated: new Date().getTime(), 
    vertices: graph.vertexList,
    edges: graph.edgeList
  };
  //await axios.post(OPTIMAL_MODEL_URL, itemToAdd).then(console.log).catch(console.log);
  console.log('DONE'); 
}

createModelForRoute('6105415556b367077ea6e70f', '61054dc956b367077ea6e719');