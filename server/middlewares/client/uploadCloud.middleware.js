const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});
// End Cloudinary

module.exports.upload = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      let uploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve({ fieldname: file.fieldname, url: result.secure_url });
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      });

      const uploadResults = await Promise.allSettled(uploadPromises);

      // Chỉ lấy những file upload thành công
      uploadResults.forEach(result => {
        if (result.status === 'fulfilled') {
          const upload = result.value;
          if (!req.body[upload.fieldname]) {
            req.body[upload.fieldname] = [];
          }
          req.body[upload.fieldname].push(upload.url);
        } else {
          console.error("Upload thất bại:", result.reason);
        }
      });
      next();
    } else {
      next();
    }
  } catch (error) {
    console.error('Middleware Upload lỗi:', error);
    res.status(500).json({ message: "Upload lỗi", error });
  }
}
