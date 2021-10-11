// external imports
const express = require("express");

// internal imports
const { getUsers, addUser, removeUser } = require("./../controller/usersController");
const decorateHtmlResponse = require("./../middleware/common/decorateHtmlResponse");
const avatarUpload = require("./../middleware/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("./../middleware/users/userValidators");
const { checkLogin } = require("./../middleware/common/checkLogin");

const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);

// add user
router.post("/", checkLogin, avatarUpload, addUserValidators, addUserValidationHandler, addUser);

// remove user
router.delete("/:id", removeUser);

module.exports = router;
