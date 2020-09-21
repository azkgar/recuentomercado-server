const express = require("express");
const AuthController = require("../controllers/auth.js");

const api = express.Router();

api.route("/refresh-access-token")
.post(AuthController.refreshAccessToken);

module.exports = api;