const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/service.controller");

router.get('/:departmentId', controller.index);
router.post('/create/:departmentId', controller.create);

module.exports = router