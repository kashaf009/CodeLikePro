import cloudinary from "../config/cloudinary.js"



const uploadOnCloudinary = async (filepath) => {
    try {
        const result =await cloudinary.uploader.upload(filepath,{
            resource_type:"image"
        });

        return result
        
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export default uploadOnCloudinary






