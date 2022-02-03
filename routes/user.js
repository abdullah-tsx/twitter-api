const express = require('express');
const router = express.Router();

const userController = require("../controller/user");

const isValidParam = require('../middleware/isValidParam');
const isAuth = require('../middleware/auth');
const infoValidator = require("../validators/updateUser/updateUser");
const validateRequest = require("../middleware/validateRequest");

router.put('/:id/follow', isAuth, isValidParam, userController.follow);
router.patch('/update', infoValidator, validateRequest, isAuth, userController.updateUser);
router.delete('/:id', isAuth, isValidParam, userController.deleteUser);

module.exports = router;