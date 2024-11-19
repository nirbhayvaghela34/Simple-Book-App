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
      resource_type: "auto",
      secure: true, // Ensure the URL uses HTTPS
    });

    // Delete the local file after upload
    fs.unlinkSync(localFilePath);

    return response; // This will include an HTTPS URL in `response.url`
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};


export { uploadOnCloudinary };
