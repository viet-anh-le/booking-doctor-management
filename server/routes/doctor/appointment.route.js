const express = require('express')
const router = express.Router()

const controller = require("../../controllers/doctor/appointment.controller");
const fileUpload = require("../../middlewares/client/upload.middleware")

router.post('/create/:id', fileUpload, controller.create);
router.get('/:id', fileUpload, controller.index);

module.exports = router