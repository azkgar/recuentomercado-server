const express = require("express");
const UserController = require("../controllers/user");
const multiparty = require("connect-multiparty");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.route("/signup")
.post(UserController.signUp);

api.route("/signin")
.post(UserController.signIn);

api.route("/users")
.get([md_auth.ensureAuth], UserController.getUsers);

api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);

module.exports = api;