const conversationModel = require("../models/conversationModel");

exports.createConversation = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let conversationID = reqBody.conversationID;
  let creatorID = reqBody.creatorID;
  let creatorRole = reqBody.creatorRole;
  let participantID = reqBody.participantID;
  let participantRole = reqBody.participantRole;

  let lastUpdatedAT = new Date(Date.now()).toISOString();
  let selectedPackageID = reqBody.selectedPackageID;

  //Make res body for posting to the Database

  let postBody = {
    conversationID,
    creatorID,
    creatorRole,
    participantID,
    participantRole,
    lastUpdatedAT,
    selectedPackageID,
  };

  // Create Database record
  conversationModel
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
exports.selectConversations = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  conversationModel
    .find(query, projection)
    .sort({ lastUpdatedAT: -1 })
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
exports.updateConversation = (req, res) => {
  let reqBody = req.body;
  let conversationID = reqBody.conversationID;
  let creatorID = reqBody.creatorID;
  let creatorRole = reqBody.creatorRole;
  let participantID = reqBody.participantID;
  let participantRole = reqBody.participantRole;

  let lastUpdatedAT = new Date(Date.now()).toISOString();
  let selectedPackageID = reqBody.selectedPackageID;

  let postBody = {
    conversationID,
    creatorID,
    creatorRole,
    participantID,
    participantRole,
    lastUpdatedAT,
    selectedPackageID,
  };

  conversationModel
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
exports.deleteConversation = (req, res) => {
  let _id = req.params.id;

  conversationModel
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
