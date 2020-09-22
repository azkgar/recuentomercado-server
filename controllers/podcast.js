const Podcast = require("../models/podcast");
const post = require("../models/post");

function addPodcast(req,res){
    const body = req.body;
    const podcast = new Podcast(body);

    podcast.save((err, podcastStored) => {
        if(err){
            res.status(500).send({code:500, message: "Error del servidor."});
        } else {
            if(!podcastStored) {
                res.status(400).send({code:400, message: "No se puede crear el podcast."});
            } else {
                res.status(200).send({code:200, message: "Podcast creado correctamente."});
            }
        }
    });
}

function getPaginatedPodcast(req,res){
    const {page = 1, limit = 10} = req.query;

    const options = {
        page,
        limit: parseInt(limit),
        sort: {date: "desc"}
    };

    Podcast.paginate({}, options, (error, podcastsStored) => {
        if(error){
            res.status(500).send({code: 500, message: "Error del servidor."});
        } else {
            if(!podcastsStored) {
                res.status(404).send({code: 404, message: "No se encontró ningún podcast."});
            } else {
                res.status(200).send({code:200, podcasts: podcastsStored});
            }
        }
    });
}

function updatePodcast(req,res){
    const podcastData = req.body;
    const {id} = req.params;

    Podcast.findByIdAndUpdate(id, podcastData, (err, podcastUpdate) => {
        if(err) {
            res.status(500).send({code:500,message:"Error del servidor."});
        } else {
            if(!podcastUpdate) {
                res.status(404).send({code:404,message:"No se encontró el podcast."});
            } else {
                res.status(200).send({code:200,message: "Podcast actualizado correctamente."});
            }
        }
    });
}

function deletePodcast(req,res){
    const {id} = req.params;

    Podcast.findByIdAndRemove(id, (err, podcastDeleted) => {
        if(err) {
            res.status(500).send({code:500,message:"Error del servidor."});
        } else {
            if(!podcastDeleted) {
                res.status(400).send({code:400,message:"Podcast no encontrado."});
            } else {
                res.status(200).send({code:200,message:"Podcast eliminado"});
            }
        }
    });
}

function getPodcast(req,res){
    const {url} = req.params;

    Podcast.findOne({url}, (err,podcastStored) => {
        if(err){
            res.status(500).send({code:500,message: "Error del servidor."});
        } else {
            if(!podcastStored) {
                res.status(404).send({code:404,message:"Podcast no encontrado."});
            } else {
                res.status(200).send({code:200,podcast: podcastStored});
            }
        }
    });
}

module.exports = {
    addPodcast,
    getPaginatedPodcast,
    updatePodcast,
    deletePodcast,
    getPodcast
}