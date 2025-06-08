const express = require('express')
const router = express.Router()
const authMiddleware = require("../../middlewares/admin/auth.middleware");

const controller = require("../../controllers/admin/adminAccounts.controller");

router.get('/:email',  authMiddleware.requireAuth, controller.index);

module.exports = router;