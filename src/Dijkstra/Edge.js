const Vertex = require("./Vertex");

class Edge {
    constructor(from, to, weight) {

        if(!(from instanceof Vertex) ||!(to instanceof Vertex) || isNaN(weight))
            throw new Error('Edge must contain 2 vertacies and weight must be a valid number');

        this.fromIndex = from.index;
        this.toIndex = to.index;
        this.weight = weight;
        from.addNeighbor(this.toIndex);
        to.addTransposeNeighbor(this.fromIndex);
    }
}

module.exports = Edge;