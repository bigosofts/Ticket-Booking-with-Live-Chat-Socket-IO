const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
   widgetName: {
    type: String, 
    required: true,
    unique: true
    },
   widgetPayload:[],
   activeStatus:{
      type: String,
      required: true,
  }

},{versionKey: false});

const widgetModel = mongoose.model("widgets",DataSchema);

module.exports = widgetModel;