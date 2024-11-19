import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically determine the resource type (image, video, etc.)
      secure: true,           // Ensure the URL uses HTTPS
    });

    // Delete the local file after upload
    fs.unlinkSync(localFilePath);
    console.log(response.secure_url);
    return response.secure_url; // Return the HTTPS URL from Cloudinary response
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};



export { uploadOnCloudinary };
