
class Vertex {

    constructor(index, lat, long, speed){
        if([index,lat,long,speed].some(isNaN))
            throw new Error('index, lat, long and value must contain a valid number');
        
        this.index = index;
        this.lat = lat;
        this.long = long;
        this.speed = speed;
        this.currentWeight = Infinity;
        this.fatherIndex = null;
        this.neighborsList = [];
        this.transposeNeighborsList = [];
    }

    addNeighbor(vertexIndex){
        this.neighborsList.push(vertexIndex);
    }

    addTransposeNeighbor(vertexIndex){
        this.transposeNeighborsList.push(vertexIndex);
    }
}

module.exports = Vertex;