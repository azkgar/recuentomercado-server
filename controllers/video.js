const Video = require("../models/video");

function addVideo(req,res){
    const body = req.body;
    const video = new Video(body);

    video.save((err, videoStored) => {
        if(err){
            res.status(500).send({code:500, message: "Error del servidor."});
        } else {
            if(!videoStored) {
                res.status(400).send({code:400, message: "No se puede crear el video."});
            } else {
                res.status(200).send({code:200, message: "Video creado correctamente."});
            }
        }
    });
}

function getPaginatedVideos(req,res){
    const {page = 1, limit = 10} = req.query;

    const options = {
        page,
        limit: parseInt(limit),
        sort: {date: "desc"}
    };

    Video.paginate({}, options, (error, videosStored) => {
        if(error){
            res.status(500).send({code: 500, message: "Error del servidor."});
        } else {
            if(!videosStored) {
                res.status(404).send({code: 404, message: "No se encontró ningún video."});
            } else {
                res.status(200).send({code:200, videos: videosStored});
            }
        }
    });
}

function updateVideo(req,res){
    const videoData = req.body;
    const {id} = req.params;

    Video.findByIdAndUpdate(id, videoData, (err, videoUpdate) => {
        if(err) {
            res.status(500).send({code:500,message:"Error del servidor."});
        } else {
            if(!videoUpdate) {
                res.status(404).send({code:404,message:"No se encontró el video."});
            } else {
                res.status(200).send({code:200,message: "Video actualizado correctamente."});
            }
        }
    });
}

function deleteVideo(req,res){
    const {id} = req.params;

    Video.findByIdAndRemove(id, (err, videoDeleted) => {
        if(err) {
            res.status(500).send({code:500,message:"Error del servidor."});
        } else {
            if(!videoDeleted) {
                res.status(400).send({code:400,message:"Video no encontrado."});
            } else {
                res.status(200).send({code:200,message:"Video eliminado"});
            }
        }
    });
}

function getVideo(req,res){
    const {url} = req.params;

    Video.findOne({url}, (err,videoStored) => {
        if(err){
            res.status(500).send({code:500,message: "Error del servidor."});
        } else {
            if(!videoStored) {
                res.status(404).send({code:404,message:"Video no encontrado."});
            } else {
                res.status(200).send({code:200,video: videoStored});
            }
        }
    });
}

function getAllVideos(req,res){
    const {search} = req.params;
    Video.find({"title": search}).exec((err,result) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!result) {
                res.status(404).send({message: "No se encontraron videos."});
            } else {
                res.status(200).send({posts: result});
            }
        }
    });
}

function getVideosRelated(req,res){
    const {tag} = req.params;

    Video.find({"categories":tag}).exec((err, result) => {
        if(err) {
            res.status(500).send({message:"Error del servidor."});
        } else {
            if(!result) {
                res.status(404).send({message: "No se encontraron Videos"});
            } else {
                res.status(200).send({videos: result});
            }
        }
    });
}

module.exports = {
    addVideo,
    getPaginatedVideos,
    updateVideo,
    deleteVideo,
    getVideo,
    getAllVideos,
    getVideosRelated
}