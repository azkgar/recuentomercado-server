const express = require("express");
const PodcastController = require("../controllers/podcast");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/add-podcast", [md_auth.ensureAuth], PodcastController.addPodcast);

api.get("/get-paginated-podcasts", PodcastController.getPaginatedPodcast);

module.exports = api;