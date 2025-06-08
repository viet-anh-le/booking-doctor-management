const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/stat.controller");

router.get('/count-user', controller.countUser);
router.get('/count-appointment', controller.countAppointment);
router.get('/daily', controller.countDaily);
router.get('/count-appointment12Month', controller.countAppointment12Month);
router.get('/target', controller.getTarget);
router.patch('/target/create', controller.createTarget);

module.exports = router