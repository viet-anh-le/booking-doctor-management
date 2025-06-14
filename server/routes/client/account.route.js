const express = require('express')
const router = express.Router()
const authMiddleware = require("../../middlewares/client/auth.middleware");

const controller = require("../../controllers/client/account.controller");

router.get('/:email',  authMiddleware.requireAuth, controller.index);

router.get('/profile/:id',  authMiddleware.requireAuth, controller.profile);

router.post('/create', controller.create);

router.post('/profile', controller.createProfile);

router.patch("/:userId/add-profile", controller.addProfileToUser);

module.exports = router