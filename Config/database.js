const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("DB is Connected Successfully"))
    .catch( (error) =>{
        console.log(error);
        console.log("DB connection Issue");
        process.emit(1);
    })
}
