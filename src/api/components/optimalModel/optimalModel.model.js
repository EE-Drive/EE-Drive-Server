const mongoose = require("mongoose");
const schemaTypes = require("../../../config/schemaTypes.constants");

const modelSchema = new mongoose.Schema(
  {
    routeID: { type: mongoose.Schema.ObjectId, ref: "ModelRoute" },
    lastUpdated: schemaTypes.nonRequiredMediumString,
    vertices: [
      {
        vertexId: mongoose.Schema.ObjectId,
        ...schemaTypes.landMark,
        speed: [schemaTypes.nonRequiredNumber],
      },
    ],
    edges: [
      {
        vertexA: mongoose.Schema.ObjectId,
        vertexB: mongoose.Schema.ObjectId,
        fuelCon: [schemaTypes.nonRequiredNumber],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("OptimalModel", modelSchema);
