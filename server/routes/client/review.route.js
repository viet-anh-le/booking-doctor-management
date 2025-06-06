const express = require('express')
const router = express.Router()

const controller = require("../../controllers/client/review.controller");

router.get('/:doctorId', controller.index);

router.post('/create', controller.create)

module.exports = router