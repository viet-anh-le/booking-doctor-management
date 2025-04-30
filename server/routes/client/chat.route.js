const express = require('express')
const router = express.Router()

const controller = require("../../controllers/client/chat.controller");

router.get('/:roomId', controller.getMessages);

router.post('/createRoom', controller.createRoom);

module.exports = router