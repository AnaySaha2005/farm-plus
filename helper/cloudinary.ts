// Require the cloudinary library
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
  const uploadImage = async (imagePath: any) => {
  const options = {
    folder: 'FarmPlus',
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};
module.exports=uploadImage;
