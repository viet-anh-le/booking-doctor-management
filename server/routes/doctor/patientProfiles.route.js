const express = require('express')
const router = express.Router()

const controller = require("../../controllers/doctor/patientProfiles.controller");

router.get('/:id', controller.index);

module.exports = router