const express = require('express')
const router = express.Router()

const controller = require("../../controllers/client/auth.controller");

router.post('/login', controller.login);

router.get('/logout', controller.logout);

router.get('/me', controller.me);

module.exports = router