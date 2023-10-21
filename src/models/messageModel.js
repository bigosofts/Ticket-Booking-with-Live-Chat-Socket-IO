const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    text: { type: String },
    attachment: { type: String },
    sender: { type: String, required: true },
    senderRole: { type: String, required: true },
    receiver: { type: String, required: true },
    receiverRole: { type: String, required: true },
    conversationID: { type: String },
    messageCreatedAT: { type: Date },
    messageUpdateAT: { type: Date },
    sendedpackageID: { type: String },
    acceptedPackage: { type: Boolean },
    rejectedPackage: { type: Boolean },
    quantityPackage: { type: Number },
    addedPrice:{type: Number}
    
  },
  { versionKey: false }
);

const messageModel = mongoose.model("messages", DataSchema);

module.exports = messageModel;
