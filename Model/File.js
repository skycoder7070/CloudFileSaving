const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});
//post middleware
fileSchema.post("save", async function (doc) {
    try {
        console.log("Doc -->", doc)
        //transpoter
        let transpoter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,//password
            },
        })

        //send Mail

        let info = await transpoter.sendMail({
            from:`ravindra singh`,
            to:doc.email,
            subject:"new file uploaded in cloudinary",
            html:`<h2>Hello To me</h2>  <p>File Is Uploaded</p> View here : <a href="${doc.imageUrl}">${doc.imageUrl}</a>`
        })

        console.log("INFO-->",info);
    } catch (error) {
        console.error(error);
        return resizeBy.status(400).json({
            success:false,
            message:"model mai gadbad hai"
        })
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;