const express = require('express')
const router = express.Router()

const controller = require("../../controllers/doctor/medicine.controller");

router.get('/:appId', controller.index);
router.post('/create/:appId', controller.create);
router.patch('/edit/:id', controller.edit);

module.exports = router