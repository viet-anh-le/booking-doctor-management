const express = require('express')
const router = express.Router()

const controller = require("../../controllers/doctor/appointment.controller");
const fileUpload = require("../../middlewares/client/upload.middleware")

router.get('/:id', fileUpload, controller.index);
router.post('/create/:id', fileUpload, controller.create);
router.patch('/edit/:id', fileUpload, controller.edit);

module.exports = router