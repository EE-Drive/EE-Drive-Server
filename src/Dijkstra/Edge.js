const Vertex = require("./Vertex");

class Edge {
    constructor(from, to, weight) {

        if(!(from instanceof Vertex) ||!(to instanceof Vertex) || isNan(weight))
            throw new Error('Edge must contain 2 vertacies and weight must be a valid number');

        this.from = from;
        this.to = to;
        this.weight = weight;
        this.from.addNeighbor(to);
        this.to.addTransposeNeighbor(from);
    }
}

module.exports = Edge;