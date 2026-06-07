const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    instructor:{
        type : mongoose.Schema.Types.ObjectId, //links to the user
        ref : "User",                     // which model to look in 
        required :true
    },
    students:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref :"User"
        }
    ],
    videos :[
        {
            title: String,
            url: String     //Cloudinary Link
        }
    ],
    price :{
        type : Number ,     
        default : 0
    }
},{timestamps : true});

module.exports = mongoose.model("Course" ,courseSchema);