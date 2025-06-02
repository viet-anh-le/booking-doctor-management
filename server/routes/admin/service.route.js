const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/service.controller");

router.get('/:departmentId', controller.index);
router.post('/create/:departmentId', controller.create);
router.patch('/edit/:serviceId', controller.edit);
router.patch('/delete/:serviceId', controller.delete);

module.exports = router