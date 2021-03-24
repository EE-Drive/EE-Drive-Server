const mongoose = require("mongoose");
const schemaTypes = require("../../../config/schemaTypes.constants");

//model schema
const modelSchema = new mongoose.Schema({ JSON: Object }, { timestamps: true });

// export and create model
module.exports = mongoose.model("RawDrive", modelSchema);
