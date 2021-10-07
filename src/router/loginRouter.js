// external imports
const express = require("express");

// internal imports
const { getLogin } = require("./../controller/loginController");
const decorateHtmlResponse = require("./../middleware/common/decorateHtmlResponse");

const router = express.Router();

// login
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
