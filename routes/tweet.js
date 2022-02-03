const express = require('express');

const tweetController = require("../controller/tweet");
const tweetValidator = require("../validators/tweet");
const isValidParam = require('../middleware/isValidParam');
const isAuth = require('../middleware/auth');
const isOwner = require('../middleware/isOwner');
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.post('/', tweetValidator, validateRequest, isAuth, tweetController.createTweet);

router.get('/', tweetController.timeline);
router.get('/:id', isValidParam, tweetController.singleTweet);

router.patch('/:id/like', isAuth, isValidParam, tweetController.like);

router.delete('/:id', isAuth, isValidParam, isOwner, tweetController.delete);

module.exports = router;