const express = require("express");
const CategoryController = require("../controllers/category");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/add-category", [md_auth.ensureAuth], CategoryController.addCategory);

api.get("/get-categories", CategoryController.getCategories);

module.exports = api;