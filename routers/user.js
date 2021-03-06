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

api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);

api.put("/activate-user/:id", [md_auth.ensureAuth], UserController.activateUser);

api.delete("/delete-user/:id", [md_auth.ensureAuth], UserController.deleteUser);

api.post("/signup-admin", [md_auth.ensureAuth], UserController.signUpAdmin);

module.exports = api;