const PriorityQueue = require("./PriorityQueue");

class Graph {
    constructor(vertexList, edgeList) {
        if(!Array.isArray(vertexList) || !Array.isArray(edgeList))
            throw new Error('vertexList and edgeList must be an array of items');
        
        this.vertexList = vertexList;
        this.edgeList = edgeList;
        this.adjacencyMatrix = this._initializeMatrix();
        this.adjacencyMatrixTranspose = this._initializeMatrix();
        this._buildGraph();
    }

    _initializeMatrix() {
        const newMatrix = [];
        for(let i = 0; i < this.vertexList.length; i++){
            const row = [];
            for(let i = 0; i < this.vertexList.length; i++)
                row.push(0);
            newMatrix.push(row);
        }  
        return newMatrix;
    }

    _buildGraph() {
        this.edgeList.forEach( ({fromIndex, toIndex, weight}) => {
            this.adjacencyMatrix[fromIndex][toIndex] = weight;
            this.adjacencyMatrixTranspose[fromIndex][toIndex] = weight;
        });
    }

    dikstra(source = this.vertexList[0] ,useTranspose = false) {
        const priorityQueue = new PriorityQueue((v1, v2) => v2.currentWeight - v1.currentWeight);
        const adjacencyMatrix = useTranspose ? this.adjacencyMatrixTranspose : this.adjacencyMatrix;
        source.currentWeight = 0;
        this.vertexList.forEach(vertex => priorityQueue.push(vertex));
        while(!priorityQueue.isEmpty()){
            const currentVertex = priorityQueue.pop();
            const neighborsList = useTranspose ? currentVertex.transposeNeighborsList : currentVertex.neighborsList;
            neighborsList.forEach(neighborIndex => this._relax(currentVertex, this.vertexList[neighborIndex], adjacencyMatrix[currentVertex.index][neighborIndex]));
        }
    }

    _relax(vertex, neighbor, weight) {
        if(neighbor.currentWeight  <= vertex.currentWeight + weight) return;
        neighbor.currentWeight = vertex.currentWeight + weight;
        neighbor.fatherIndex = vertex.index;
    }
}

module.exports = Graph;