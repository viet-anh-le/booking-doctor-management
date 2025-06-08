const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/stat.controller");

router.get('/count-user', controller.countUser);

module.exports = router