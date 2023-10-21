const messageModel = require("../models/messageModel");

exports.createMessage = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let text = reqBody.text;
  let attachment = reqBody.attachment;
  let sender = reqBody.sender;
  let senderRole = reqBody.senderRole;
  let receiver = reqBody.receiver;
  let receiverRole = reqBody.receiverRole;
  let conversationID = reqBody.conversationID;
  let messageCreatedAT = new Date(Date.now()).toISOString();
  let messageUpdateAT = new Date(Date.now()).toISOString();
  let sendedpackageID = reqBody.sendedpackageID;
  let acceptedPackage = reqBody.acceptedPackage;
  let rejectedPackage = reqBody.rejectedPackage;
  let quantityPackage = reqBody.quantityPackage;
  let addedPrice = reqBody.addedPrice;

  //Make res body for posting to the Database

  let postBody = {
    text,
    attachment,
    sender,
    senderRole,
    receiver,
    receiverRole,
    conversationID,
    messageCreatedAT,
    messageUpdateAT,
    sendedpackageID,
    acceptedPackage,
    rejectedPackage,
    quantityPackage,
    addedPrice,
  };

  // Create Database record
  messageModel
    .create(postBody)
    .then((data) => {
      res.status(200).json({
        status: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        data: err,
      });
    });
};

// find from the database record
exports.selectMessages = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  messageModel
    .find(query, projection)
    .sort({ messageCreatedAT: -1 })
    .then((data) => {
      res.status(200).json({
        status: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        data: err,
      });
    });
};

//Update Database Record
exports.updateMessage = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let text = reqBody.text;
  let attachment = reqBody.attachment;
  let sender = reqBody.sender;
  let senderRole = reqBody.senderRole;
  let receiver = reqBody.receiver;
  let receiverRole = reqBody.receiverRole;
  let conversationID = reqBody.conversationID;
  let messageUpdateAT = new Date(Date.now()).toISOString();
  let sendedpackageID = reqBody.sendedpackageID;
  let acceptedPackage = reqBody.acceptedPackage;
  let rejectedPackage = reqBody.rejectedPackage;
  let quantityPackage = reqBody.quantityPackage;
  let addedPrice = reqBody.addedPrice;

  let postBody = {
    text,
    attachment,
    sender,
    senderRole,
    receiver,
    receiverRole,
    conversationID,
    messageUpdateAT,
    sendedpackageID,
    acceptedPackage,
    rejectedPackage,
    quantityPackage,
    addedPrice,
  };

  messageModel
    .updateOne({ _id: filter }, { $set: postBody }, { upsert: true })
    .then((data) => {
      res.status(200).json({
        status: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        data: err,
      });
    });
};

//Deleting from database
exports.deleteMessage = (req, res) => {
  let _id = req.params.id;

  messageModel
    .deleteOne({ _id: _id })
    .then((data) => {
      res.status(200).json({
        status: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        data: err,
      });
    });
};
