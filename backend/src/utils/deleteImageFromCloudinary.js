import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";

const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    const publicId = imageUrl.split("/").pop().split(".")[0];

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result === "ok") {
      return { success: true };
    } else {
      return { success: false ,  message: result.result };
    }
  } catch (error) {
    throw new ApiError(500, "Something went wrong while deleting image.");
  }
};

export { deleteImageFromCloudinary };
