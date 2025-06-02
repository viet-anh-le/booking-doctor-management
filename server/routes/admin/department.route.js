const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/department.controller");

router.get('/:hospitalId', controller.index);
router.post('/create/:hospitalId', controller.create);

module.exports = router