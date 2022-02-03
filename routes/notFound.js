const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
    res.status(404).json({status: 404, message: 'Requested URL is not valid'});
})

module.exports = router;
