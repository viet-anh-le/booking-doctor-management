const express = require('express')
const router = express.Router()

const multer = require("multer");
const uploadCloud = require("../../middlewares/client/uploadCloud.middleware");

const upload = multer();

const controller = require("../../controllers/admin/account.controller");

router.get('/', controller.index);
router.post('/create',upload.array("avatar", 1), uploadCloud.upload, controller.create);

module.exports = router