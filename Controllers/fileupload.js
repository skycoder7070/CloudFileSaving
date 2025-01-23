const File = require("../Model/File");
const cloudinary = require("cloudinary").v2;
exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ", file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success: true,
            message: 'Local File Uploaded Successfully',
        });

    }
    catch (error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}
function isfiletypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quailty) {
    const options = {folder}
    console.log("temp file path ", file.tempFilePath);
    if(quailty)
    {
        options.quailty= quailty;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
//image upload handler
exports.imageUpload = async (req,res) =>{
    try {
        const {name ,tags, email }=req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log(file);
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isfiletypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File Format Not Supported"
            })
        }
        //file format supported
        const response = await uploadFileToCloudinary(file,"ravindra");
        //db mai entry save karni haio
        console.log(response);

        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully uploaded ",
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wromg"
        });
    }
} 

//vedio upload handler
exports.vedioUpload = async (req,res) =>{
    try {
        const {name ,tags, email }=req.body;
        console.log(name,tags,email);
        const file = req.files.videoFile;
        console.log(file)
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase(); 
        console.log("File types: ", fileType);

        const maxFileSize = 5 * 1024 * 1024; 
        if (file.size > maxFileSize) {
          return res.status(400).json({
            success: false,
            message: "File is too large. Maximum size is 5MB."
          });
        }
        if (!isfiletypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File Format Not Supported"
            })
        }
        const response = await uploadFileToCloudinary(file,"ravindra");
        console.log(response);
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        console.log(filedata);

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully uploaded ",
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wromg"
        });
    }
}

exports.imageSizeReducer = async ( req,res) =>{
    try {
        const {name ,tags, email }=req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isfiletypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File Format Not Supported"
            })
        }
        //file format supported
        const response = await uploadFileToCloudinary(file,"ravindra",30);
        //db mai entry save karni haio
        console.log(response);

        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully uploaded ",
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wromg"
        });
    }
}