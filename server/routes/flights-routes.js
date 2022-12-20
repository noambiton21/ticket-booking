const express = require("express");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

module.exports = router;
