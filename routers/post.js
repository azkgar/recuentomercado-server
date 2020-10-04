const express = require("express");
const PostController = require("../controllers/post");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/add-post", [md_auth.ensureAuth], PostController.addPost);

api.get("/get-paginated-posts", PostController.getPaginatedPosts);

api.put("/update-post/:id", [md_auth.ensureAuth], PostController.updatePost);

api.delete("/delete-post/:id", [md_auth.ensureAuth], PostController.deletePost);

api.get("/get-post/:url", PostController.getPost);

api.get("/get-all-posts/", PostController.getAllPosts);

api.get("/get-posts-related/:tag", PostController.getPostsRelated);

module.exports = api;