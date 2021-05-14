
class Vertex {

    constructor(index, lat, long, speed){
        if([index,lat,long,speed].some(isNaN))
            throw new Error('index, lat, long and value must contain a valid number');
        
        this.index = index;
        this.lat = lat;
        this.long = long;
        this.speed = speed;
        this.currentWeight = Infinity;
        this.father = null;
        this.neighborsList = [];
        this.transposeNeighborsList = [];
    }

    addNeighbor(vertex){
        this.neighborsList.push(vertex);
    }

    addTransposeNeighbor(vertex){
        this.transposeNeighborsList.push(vertex);
    }
}

module.exports = Vertex;