const cloudinary = require ("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

//connect to cloudinary using your credentials 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

//Tell the multer to store the files in cloudinary 
const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder : "lms-videos",
        resource_type : "video",
        allowed_fomats :["mp4","mkv","avi"]
    }
});

const upload = multer({storage});

module.exports = {cloudinary , upload};