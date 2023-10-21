const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
        userName:{type:String, required:true, unique:true},
        userRole:{type:String, default:"instructor"},
        instructorEmail:{type:String},
        instructorPhone:{type:Number},
        instructorBio:{type:String},
        instructorCreatedDate:{type:Date},
        instructorUpdatedDate:{type:Date},
        activeStatus:{type:String},
        isAdmin:{type:Boolean, default:false},
        password:{type:String, required:true},
        profileImage:{type:String}

},{versionKey: false});

const instructorModel = mongoose.model("instructors",DataSchema);

module.exports = instructorModel;