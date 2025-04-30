const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const uploadBuffersToCloudinary = async (buffers) => {
  const uploadPromises = buffers.map((buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  });

  const results = await Promise.allSettled(uploadPromises);

  const urls = results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);

  return urls;
};

module.exports = { uploadBuffersToCloudinary };
