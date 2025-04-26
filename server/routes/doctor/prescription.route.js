const express = require('express')
const router = express.Router()

const controller = require("../../controllers/doctor/prescription.controller");

router.post('/create/:appId', controller.create);

module.exports = router