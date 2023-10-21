const orderModel = require("../models/orderModel");

exports.createOrder = (req, res) => {
    //Receive Post Request Data from req body
    let reqBody = req.body;
    let orderID =reqBody.orderID;
    let packageID =reqBody.packageID;
    let instructorID =reqBody.instructorID;
    let orderDescription =reqBody.orderDescription;
    let orderCreatedDate = new Date(Date.now()).toISOString();
    let orderUpdatedDate = new Date(Date.now()).toISOString();
    let orderStatus = reqBody.orderStatus;
    let orderPrice = reqBody.orderPrice;
    let orderNumber = reqBody.orderNumber;
    let activeStatus = reqBody.activeStatus;
    let clientID =reqBody.clientID;

    //Make res body for posting to the Database

    let postBody={
        orderID,
        packageID,
        instructorID,
        orderDescription,
        orderCreatedDate,
        orderUpdatedDate,
        orderStatus,
        orderPrice,
        orderNumber,
        activeStatus,
        clientID
    };

    // Create Database record
    orderModel.create(postBody).then((data)=>{
        res.status(200).json({
            status:"Success",
            data: data
        });
    }).catch((err)=>{
        res.status(400).json({
            status: "Failed",
            data: err
        })
    });

}


// find from the database record
exports.selectOrders=(req,res)=>{
    let query=req.body.query;
    let projection=req.body.projection
    orderModel.find(query, projection).sort({ orderCreatedDate: -1 }).then((data)=>{
        res.status(200).json({
            status:"Success",
            data: data
        })
    }).catch((err)=>{
        res.status(400).json({
            status:"Failed",
            data: err 
        })
    })
}


//Update Database Record
exports.updateOrder=(req,res)=>{
    let reqBody= req.body;
    let filter=reqBody["_id"];
    let orderID =reqBody.orderID;
    let packageID =reqBody.packageID;
    let instructorID =reqBody.instructorID;
    let orderDescription =reqBody.orderDescription;
    let orderUpdatedDate = new Date(Date.now()).toISOString();
    let orderStatus = reqBody.orderStatus;
    let orderPrice = reqBody.orderPrice;
    let orderNumber = reqBody.orderNumber;
    let activeStatus = reqBody.activeStatus;
    let clientID = reqBody.clientID;

    let postBody={
        orderID,
        packageID,
        instructorID,
        orderDescription,
        orderUpdatedDate,
        orderStatus,
        orderPrice,
        orderNumber,
        activeStatus,
        clientID
    };

    orderModel.updateOne({_id:filter}, {$set:postBody},{upsert:true}).then((data)=>{
        res.status(200).json({
            status:"Success",
            data: data
        })
    }).catch((err)=>{
        res.status(400).json({
            status:"Failed",
            data: err 
        })
    })
}


//Deleting from database
exports.deleteOrder=(req,res)=>{

    let _id=  req.params.id;

    orderModel.deleteOne({_id:_id}).then((data)=>{
        res.status(200).json({
            status:"Success",
            data: data
        })
    }).catch((err)=>{
        res.status(400).json({
            status:"Failed",
            data: err 
        })
    })

}