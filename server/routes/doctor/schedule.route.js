const express = require('express')
const router = express.Router()

const controller = require("../../controllers/doctor/schedule.controller.js");

router.post('/create', controller.create);

module.exports = router