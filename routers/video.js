const express = require("express");
const VideoController = require("../controllers/video");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/add-video", [md_auth.ensureAuth], VideoController.addVideo);

api.get("/get-paginated-videos", VideoController.getPaginatedVideos);

api.put("/update-video/:id", [md_auth.ensureAuth], VideoController.updateVideo);

api.delete("/delete-video/:id", [md_auth.ensureAuth], VideoController.deleteVideo);

api.get("/get-video/:url", VideoController.getVideo);

api.get("/get-all-videos", VideoController.getAllVideos);

api.get("/get-videos-related/:tag", VideoController.getVideosRelated);

module.exports = api;