const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
        orderID:{type:String},
        packageID:{type:String},
        instructorID:{type:String},
        orderDescription:{type:String},
        orderCreatedDate:{type:Date},
        orderUpdatedDate:{type:Date},
        orderStatus:{type:String},
        orderPrice:{type:Number},
        orderNumber:{type:Number},
        activeStatus:{type:String},
        clientID:{type:String}

},{versionKey: false});

const orderModel = mongoose.model("orders",DataSchema);

module.exports = orderModel;