const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    course :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required : true
    },
    instructor:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true 
    },
    duedate:{
        type : Date,
        required : true
    },
    submissions :[
        {
            student : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
            },
            answer: String,                 //Student Answer
            submittedAt:{
                type : Date,
                default : Date.now
            },
            grade:{
                type: Number,
                default : null              // instructor can give grade later
            }
        }
    ]
},{ timestamps :true});

module.exports = mongoose.Schema("Assignment", assignmentSchema);