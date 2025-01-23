//app create
const express = require("express");
const app = express();

//PORt find krna h 
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add krne h 
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
//db se connect krnah 
const db = require("./Config/database");
db.connect();

//cloud se connect krna h 
const cloudinary = require("./Config/cloudinary");
cloudinary.cloudinaryconnect();

//api route mount krna h 
const Upload = require("./Routes/FileUpload");
app.use('/api/v1/upload', Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})


