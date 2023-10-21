const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
        userName:{type:String,unique:true,required:true},
        userRole:{type:String, default: "client"},
        clientEmail:{type:String, required:true},
        clientPhone:{type:Number},
        clientCreatedDate:{type:Date},
        clientUpdatedDate:{type:Date},
        activeStatus:{type:String},
        password:{type:String,required:true},
        isAdmin:{type:Boolean, default: false},
        profileImage:{type:String}

},{versionKey: false});

const clientModel = mongoose.model("clients",DataSchema);

module.exports = clientModel;