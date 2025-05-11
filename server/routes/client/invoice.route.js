const express = require('express')
const router = express.Router()

const controller = require("../../controllers/client/invoice.controller");

router.get('/:id', controller.index);

module.exports = router