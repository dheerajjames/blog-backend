const multer = require('multer');
const DataURI = require('datauri/parser');
const path = require('path');
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});


const storage = process.env.STORAGE==="local"?
 multer.diskStorage( {destination: function (req, file, cb) {
    cb(null, './uploads')
  }})
  :multer.memoryStorage();

const multerUploads = multer({ storage }).single('blogImage');

const getImageURI = async (req) => {
    try{
        const dURI = await new DataURI();
        let uri = dURI.format(path.extname(req.file.originalname).toString(), req.file.buffer);
        return uri;

    }catch(err){

        console.log('ImageURI',err);
    }
    
}

module.exports = {
    multerUploads,
    getImageURI
}