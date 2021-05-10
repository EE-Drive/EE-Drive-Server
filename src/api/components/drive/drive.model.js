const mongoose = require("mongoose");
const schemaTypes = require("../../../config/schemaTypes.constants");

//model schema
const modelSchema = new mongoose.Schema(
  {
    carTypeId: { type: mongoose.Schema.ObjectId, ref: "CarType" },
    isProccesed: schemaTypes.nonRequiredBoolean,
    driverAssist: schemaTypes.nonRequiredBoolean,
    driveRawData: [],
  },
  { timestamps: true }
);

/*
  {
    routeID: { type: mongoose.Schema.ObjectId, ref: "ModelRoute" },
    rawData: [
      {
        ...schemaTypes.landMark,
        fuelCon: [schemaTypes.nonRequiredNumber],
        speed: [schemaTypes.nonRequiredNumber],
      },
    ],
  },
*/

// export and create model
module.exports = mongoose.model("Drive", modelSchema);
