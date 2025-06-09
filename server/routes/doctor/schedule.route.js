const express = require('express')
const router = express.Router()

const controller = require("../../controllers/doctor/schedule.controller.js");

router.get('/:doctorId', controller.index);

router.post('/create', controller.create);

router.delete('/delete', controller.delete);

router.patch('/edit/:id', controller.edit);

module.exports = router