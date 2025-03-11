const express = require('express')
const router = express.Router()

const controller = require("../../controllers/client/doctor.controller");

router.get('/', controller.index);

router.get('/:spec', controller.getBySpec);

module.exports = router