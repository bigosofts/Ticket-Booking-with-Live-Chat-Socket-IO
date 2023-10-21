const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    conversationID: { type: String, unique: true },
    creatorID: { type: String },
    creatorRole: { type: String },
    participantID: { type: String },
    participantRole: { type: String },
    lastUpdatedAT: { type: Date },
    selectedPackageID: { type: String },
  },
  { versionKey: false }
);

const conversationModel = mongoose.model("conversations", DataSchema);

module.exports = conversationModel;
