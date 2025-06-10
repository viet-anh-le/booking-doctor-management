const express = require('express')
const router = express.Router()

const multer = require("multer");
const uploadCloud = require("../../middlewares/client/uploadCloud.middleware");

const upload = multer();

const controller = require("../../controllers/admin/hospital.controller");

router.get('/:type', controller.index);
router.post('/create', upload.array("logo", 1), uploadCloud.upload, controller.create);
router.patch('/edit/:id', upload.array("logo", 1), uploadCloud.upload, controller.edit);
router.patch('/delete/:id', controller.delete);

module.exports = router