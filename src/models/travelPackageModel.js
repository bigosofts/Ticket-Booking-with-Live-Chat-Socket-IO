const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    packageId: { type: String, unique: true },
    packageType: { type: String },
    packageTitle: { type: String },
    packageCreatedDate: { type: Date },
    packageUpdatedDate: { type: Date },
    createdUser: { type: String },
    createdUserType: { type: String },
    activeStatus: { type: String },
    preset: { type: Boolean },
    presetUsers: [],
    country: { type: String },
    activity: { type: String },
    difficulty: { type: String },
    price: { type: Number },
    duration: { type: Number },
    place: { type: String },
    travelTime: { type: Date },
    previousExperience: { type: Boolean },
    equipment: [],
    groupSize: { type: Number },
    travelDescription: { type: String },
    haveGuiding: { type: Boolean },
    haveAccomodation: { type: Boolean },
    haveFood: { type: Boolean },
    travelImage: [],
    reviews: [
      {
        commentedUser: {
          type: String,
        },
        reviewStarCount: {
          type: Number,
        },
        commentBody: {
          type: String,
        },
        createdDate: { type: Date },
        activeStatus: { type: Boolean },
      },
    ],
  },
  { versionKey: false }
);

const travelPackageModel = mongoose.model("packages", DataSchema);

module.exports = travelPackageModel;
