const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/department.controller");

router.get('/:hospitalId', controller.index);
router.post('/create/:hospitalId', controller.create);
router.patch('/edit/:departmentId', controller.edit);
router.patch('/delete/:departmentId', controller.delete);

module.exports = router