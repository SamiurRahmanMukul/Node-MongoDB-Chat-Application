// external imports
const express = require("express");

// internal imports
const { getInbox } = require("./../controller/inboxController");
const decorateHtmlResponse = require("./../middleware/common/decorateHtmlResponse");

const router = express.Router();

// inbox
router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;
