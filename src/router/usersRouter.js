// external imports
const express = require("express");

// internal imports
const { getUsers } = require("./../controller/usersController");
const decorateHtmlResponse = require("./../middleware/common/decorateHtmlResponse");

const router = express.Router();

// users
router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
