const clientProfileModel = require("../models/clientProfileModel");
const { hashedPasswordCustom } = require("../middlewares/passwordEncryption");

exports.createClient = (req, res) => {
  //Receive Post Request Data from req body

  let reqBody = req.body;
  let userName = reqBody.userName;
  let clientEmail = reqBody.clientEmail;
  let clientPhone = reqBody.clientPhone;
  let profileImage = reqBody.profileImage;
  let clientCreatedDate = new Date(Date.now()).toISOString();
  let clientUpdatedDate = new Date(Date.now()).toISOString();
  let activeStatus = reqBody.activeStatus;
  let password = req.headers["passKey"];
  let userRole = "client";

  //Make res body for posting to the Database

  let postBody = {
    userName,
    clientEmail,
    clientPhone,
    clientCreatedDate,
    clientUpdatedDate,
    activeStatus,
    password,
    userRole,
    profileImage,
  };

  // Create Database record
  clientProfileModel
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
exports.selectClients = (req, res) => {
  let query = req.headers["userName"];
  let projection = req.body.projection;
  clientProfileModel
    .find({ userName: query }, projection)
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


exports.selectAllClients = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  clientProfileModel
    .find(query, projection)
    .sort({ clientCreatedDate: -1 })
    .then((data) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};
exports.selectAllClientsPublic = (req, res) => {
  let query = req.body.query;
  clientProfileModel
    .find(query, {userName:true,clientEmail:true})
    .sort({ clientCreatedDate: -1 })
    .then((data) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};

//Update Database Record
exports.updateClient = async (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let hashedPass = await hashedPasswordCustom(reqBody.password);
  var postBody;

  let userName = reqBody.userName;
  let profileImage = reqBody.profileImage;
  let clientEmail = reqBody.clientEmail;
  let clientPhone = reqBody.clientPhone;
  let clientUpdatedDate = new Date(Date.now()).toISOString();
  let activeStatus = reqBody.activeStatus;

  if (hashedPass == null) {
    postBody = {
      userName,
      clientEmail,
      clientPhone,
      clientUpdatedDate,
      activeStatus,
      profileImage,
    };
  } else {
    postBody = {
      userName,
      clientEmail,
      clientPhone,
      clientUpdatedDate,
      activeStatus,
      password: hashedPass,
      profileImage,
    };
  }

  clientProfileModel
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
exports.deleteClient = (req, res) => {
  let _id = req.params.id;

  clientProfileModel
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
