const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/patient.controller");

router.get('/', controller.index);
router.patch('/delete/:id', controller.delete);

module.exports = router