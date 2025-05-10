const express = require('express')
const router = express.Router()

const controller = require("../../controllers/doctor/invoice.controller");

router.get('/:appId', controller.index);
router.post('/create', controller.create);
router.patch('/edit/:id', controller.edit);

module.exports = router