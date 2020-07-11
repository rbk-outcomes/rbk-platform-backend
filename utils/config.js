const dotenv = require("dotenv");
// const cloudinary = require("cloudinary");
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  databaseURL: process.env.DATABASE_URI,
  jwtSecret: process.env.JWT_SECRET
};
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });
