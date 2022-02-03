const express = require("express");
const {body} = require('express-validator');

const {login, register} = require("../controller/auth");
const validateRequest = require("../middleware/validateRequest");
const registerValidator = require("../validators/register/register");
const loginValidator = require("../validators/login/login");
const requiredFieldsRegister = require("../validators/register/requiredFields");
const router = express.Router();

router.post('/login', [...loginValidator], validateRequest, login);
router.post('/register', [...requiredFieldsRegister, ...registerValidator], validateRequest, register);

module.exports = router;