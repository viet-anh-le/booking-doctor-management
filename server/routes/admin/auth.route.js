const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/auth.controller");

router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.patch('/edit/:id', controller.edit);
router.get('/me', controller.me);

module.exports = router