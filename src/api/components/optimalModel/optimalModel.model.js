const mongoose = require("mongoose");
const schemaTypes = require("../../../config/schemaTypes.constants");

const modelSchema = new mongoose.Schema(
  {
    carTypeID: { type: mongoose.Schema.ObjectId, ref: "CarType" },
    routeID: { type: mongoose.Schema.ObjectId, ref: "ModelRoute" },
    lastUpdated: schemaTypes.nonRequiredMediumString,
    vertices: [{}],
    edges: [{}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("OptimalModel", modelSchema);
