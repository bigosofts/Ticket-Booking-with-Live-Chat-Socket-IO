const instructorModel = require("../models/instructorProfileModel");
const { hashedPasswordCustom } = require("../middlewares/passwordEncryption");

exports.createInstructor = (req, res) => {
  //Receive Post Request Data from req body

  let reqBody = req.body;
  let userName = reqBody.userName;
  let profileImage = reqBody.profileImage;
  let instructorEmail = reqBody.instructorEmail;
  let instructorPhone = reqBody.instructorPhone;
  let instructorBio = reqBody.instructorBio;
  let instructorCreatedDate = new Date(Date.now()).toISOString();
  let instructorUpdatedDate = new Date(Date.now()).toISOString();
  let activeStatus = reqBody.activeStatus;
  let isAdmin = reqBody.isAdmin;
  let password = req.headers["passKey"];
  let userRole = "instructor";

  //Make res body for posting to the Database

  let postBody = {
    userName,
    instructorEmail,
    instructorPhone,
    instructorBio,
    instructorCreatedDate,
    instructorUpdatedDate,
    activeStatus,
    isAdmin,
    password,
    profileImage,
    userRole,
  };

  // Create Database record
  instructorModel
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
exports.selectInstructors = (req, res) => {
  let query = req.headers["userName"];
  let projection = req.body.projection;
  instructorModel
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

exports.selectAllInstructors = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  instructorModel
    .find(query, projection)
    .sort({ instructorCreatedDate: -1 })
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
exports.selectAllInstructorsPublic = (req, res) => {
  let query = req.body.query;
  instructorModel
    .find(query, {userName:true,instructorEmail:true})
    .sort({ instructorCreatedDate: -1 })
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
exports.updateInstructor = async (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let hashedPass = await hashedPasswordCustom(reqBody.password);
  var postBody;

  let userName = reqBody.userName;
  let profileImage = reqBody.profileImage;
  let instructorEmail = reqBody.instructorEmail;
  let instructorPhone = reqBody.instructorPhone;
  let instructorBio = reqBody.instructorBio;
  let instructorUpdatedDate = new Date(Date.now()).toISOString();
  let activeStatus = reqBody.activeStatus;
  let isAdmin = reqBody.isAdmin;

  if (hashedPass == null) {
    postBody = {
      userName,
      instructorEmail,
      instructorPhone,
      instructorBio,
      instructorUpdatedDate,
      activeStatus,
      isAdmin,
      profileImage,
    };
  } else {
    postBody = {
      userName,
      instructorEmail,
      instructorPhone,
      instructorBio,
      instructorUpdatedDate,
      activeStatus,
      isAdmin,
      password: hashedPass,
      profileImage,
    };
  }

  instructorModel
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
exports.deleteInstructor = (req, res) => {
  let _id = req.params.id;

  instructorModel
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
