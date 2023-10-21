const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
    postId:{type: String, required: true, unique:true},
    postImageLink:{
        type:String,
        required:true
    },
    postTitle:{
        en:{
            type:String,
            required: true
        }
    },
    postDescription: {
        en:{
            type:String,
            required: true
        }
    },
    postCategory:{
        en:{
            type:String,
            required: true
        }
    },
    postCreatedDate:{type:Date},
    postUpdatedDate:{type:Date},

    postPopularity: {
        en:{
            type:String,
            required: true
        }
    },
    postUser: {type:String,required: true},
    activeStatus:{
        type: String,
        required: true,
    }

},{versionKey: false});

const postModel = mongoose.model("posts",DataSchema);

module.exports = postModel;