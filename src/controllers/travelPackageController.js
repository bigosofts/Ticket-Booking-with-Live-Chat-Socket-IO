const travelPackageModel = require("../models/travelPackageModel");

exports.createPackage = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let packageId = reqBody.packageId;
  let packageType = reqBody.packageType;
  let packageTitle = reqBody.packageTitle;
  let packageCreatedDate = new Date(Date.now()).toISOString();
  let packageUpdatedDate = new Date(Date.now()).toISOString();
  let createdUser = reqBody.createdUser;
  let createdUserType = reqBody.createdUserType;
  let activeStatus = reqBody.activeStatus;
  let preset = reqBody.preset;
  let presetUsers = reqBody.presetUsers;
  let country = reqBody.country;
  let activity = reqBody.activity;
  let difficulty = reqBody.difficulty;
  let price = reqBody.price;
  let duration = reqBody.duration;
  let place = reqBody.place;
  let travelTime = reqBody.travelTime;
  let previousExperience = reqBody.previousExperience;
  let equipment = reqBody.equipment;
  let groupSize = reqBody.groupSize;
  let travelDescription = reqBody.travelDescription;
  let haveGuiding = reqBody.haveGuiding;
  let haveAccomodation = reqBody.haveAccomodation;
  let haveFood = reqBody.haveFood;
  let travelImage = reqBody.travelImage;
  let reviews = reqBody.reviews;
  let maxPrice = reqBody.maxPrice;
  let travelTimeTwo = reqBody.travelTimeTwo;

  //Make res body for posting to the Database

  let postBody = {
    packageId,
    packageType,
    packageTitle,
    packageCreatedDate,
    packageUpdatedDate,
    createdUser,
    createdUserType,
    activeStatus,
    preset,
    presetUsers,
    country,
    activity,
    difficulty,
    price,
    duration,
    place,
    travelTime,
    previousExperience,
    equipment,
    groupSize,
    travelDescription,
    haveGuiding,
    haveAccomodation,
    haveFood,
    travelImage,
    reviews,
    maxPrice,
    travelTimeTwo,
  };

  // Create Database record
  travelPackageModel
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
exports.selectPackages = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  travelPackageModel
    .find(query, projection)
    .sort({ packageCreatedDate: -1 })
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
exports.updatePackage = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let packageId = reqBody.packageId;
  let packageType = reqBody.packageType;
  let packageTitle = reqBody.packageTitle;
  let packageUpdatedDate = new Date(Date.now()).toISOString();
  let createdUser = reqBody.createdUser;
  let createdUserType = reqBody.createdUserType;
  let activeStatus = reqBody.activeStatus;
  let preset = reqBody.preset;
  let presetUsers = reqBody.presetUsers;
  let country = reqBody.country;
  let activity = reqBody.activity;
  let difficulty = reqBody.difficulty;
  let price = reqBody.price;
  let duration = reqBody.duration;
  let place = reqBody.place;
  let travelTime = reqBody.travelTime;
  let previousExperience = reqBody.previousExperience;
  let equipment = reqBody.equipment;
  let groupSize = reqBody.groupSize;
  let travelDescription = reqBody.travelDescription;
  let haveGuiding = reqBody.haveGuiding;
  let haveAccomodation = reqBody.haveAccomodation;
  let haveFood = reqBody.haveFood;
  let travelImage = reqBody.travelImage;
  let reviews = reqBody.reviews;
  let maxPrice = reqBody.maxPrice;
  let travelTimeTwo = reqBody.travelTimeTwo;
  

  let postBody = {
    packageId,
    packageType,
    packageTitle,
    packageUpdatedDate,
    createdUser,
    createdUserType,
    activeStatus,
    preset,
    presetUsers,
    country,
    activity,
    difficulty,
    price,
    duration,
    place,
    travelTime,
    previousExperience,
    equipment,
    groupSize,
    travelDescription,
    haveGuiding,
    haveAccomodation,
    haveFood,
    travelImage,
    reviews,
    maxPrice,
    travelTimeTwo,
   
  };
  travelPackageModel
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
exports.deletePackage = (req, res) => {
  let _id = req.params.id;

  travelPackageModel
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
