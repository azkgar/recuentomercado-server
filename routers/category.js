const express = require("express");
const CategoryController = require("../controllers/category");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/add-category", [md_auth.ensureAuth], CategoryController.addCategory);

api.get("/get-categories", CategoryController.getCategories);

api.put("/update-category/:id", [md_auth.ensureAuth], CategoryController.updateCategory);

api.put("/activate-category/:id", [md_auth.ensureAuth], CategoryController.activateCategory);

api.delete("/delete-category/:id", [md_auth.ensureAuth], CategoryController.deleteCategory);

api.get("/get-category/:url", CategoryController.getCategory);

module.exports = api;