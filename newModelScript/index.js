const { getRelevantData, getRelevantDataForNormalize } = require('./eedrive.service');
const { learn } = require('./learn.service');


async function createModelForRoute(routeID, carTypeID) {
  const relevantData = await getRelevantData(routeID, carTypeID);
  const relevantDataForNormalize = await getRelevantDataForNormalize(routeID, carTypeID);
  const learningResult = await learn(relevantData, relevantDataForNormalize);
  // const normalizedData = normalizeData(relevantData, learningResult);
  // console.log(learningResult);
}

createModelForRoute('611523cd710367795baf3440', '61070aa856b367077ea6e78f');

// modelRouteController.createModelForRote = async (req, res) => {
//     const model = await axios.post('http://localhost:8001/items/', {rawdata: data}).then(res => res.data);
//     const clusters = divideToClusters(model);
//     const vertexList = clusters.reduce((prev, curr) => curr ? [...prev, ...curr.map(({vertex}) => vertex)] : prev ,[]);
//     const edgeList = [];
//     for(let i=0; i < clusters.length - 1; i++)
//         clusters[i].forEach(({vertex:v1, fuelCon:f1}) => 
//             clusters[i+1].forEach(({vertex:v2}) => edgeList.push(new Edge(v1, v2, f1)))
//         );
  
//     const target = new Vertex(vertexList.length,0, 0, 0);
//     vertexList.push(target);
//     clusters[clusters.length - 1].forEach(({vertex:v1, fuelCon:f1}) => edgeList.push(new Edge(v1, target, f1)));
//     const graph = new Graph(vertexList, edgeList);
//     graph.dikstra(target, true);

//     let savedItem;
//     if(current.length < 1) 
//         savedItem = await OptimalModelService.addItem({
//             carTypeID,
//             routeID,
//             lastUpdated: new Date().getTime(), 
//             vertices: graph.vertexList,
//             edges: graph.edgeList
//         })
//     else {
//         savedItem = await OptimalModelService.updateSpecificItem(current._id, {
//             carTypeID,
//             routeID,
//             lastUpdated: new Date().getTime(), 
//             vertices: graph.vertexList,
//             edges: graph.edgeList
//         });
//     } 
  
//     res.json(savedItem);
// };