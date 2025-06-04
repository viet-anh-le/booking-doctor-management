const express = require('express')
const router = express.Router()

const controller = require("../../controllers/doctor/service.controller.js");

router.get('/:doctorId', controller.index);

module.exports = router