const express = require('express')
const router = express.Router()

const controller = require("../../controllers/client/vnpay.controller");

router.post('/create-qr', controller.createQR);
router.get('/check-payment-vnpay', controller.check);

module.exports = router