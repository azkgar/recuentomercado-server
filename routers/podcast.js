const express = require("express");
const PodcastController = require("../controllers/podcast");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/add-podcast", [md_auth.ensureAuth], PodcastController.addPodcast);

api.get("/get-paginated-podcasts", PodcastController.getPaginatedPodcast);

api.put("/update-podcast/:id", [md_auth.ensureAuth], PodcastController.updatePodcast);

api.delete("/delete-podcast/:id", [md_auth.ensureAuth], PodcastController.deletePodcast);

api.get("/get-podcast/:url", PodcastController.getPodcast);

api.get("/get-all-podcasts/:search", PodcastController.getAllPodcasts);

api.get("/get-podcasts-related/:tag", PodcastController.getPodcastsRelated);

module.exports = api;