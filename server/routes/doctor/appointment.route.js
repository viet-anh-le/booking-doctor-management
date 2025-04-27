const express = require('express');
const router = express.Router();

const multer = require("multer");
const uploadCloud = require("../../middlewares/client/uploadCloud.middleware");

const upload = multer();

const controller = require("../../controllers/doctor/appointment.controller");

router.get('/:id', upload.array("images", 10), uploadCloud.upload, controller.index);
router.get('/detail/:id', upload.array("images", 10), uploadCloud.upload, controller.detail);
router.post('/create/:id', upload.array("images", 10), uploadCloud.upload, controller.create);
router.patch('/edit/:id', upload.array("images", 10), uploadCloud.upload, controller.edit);

module.exports = router