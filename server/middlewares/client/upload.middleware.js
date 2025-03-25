const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
  fileFilter: function (req, file, callback){
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg"){
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  }
});

const upload = multer({storage: storage});
const fileUpload = upload.fields([{name: "images", maxCount: 8}]);

module.exports = fileUpload