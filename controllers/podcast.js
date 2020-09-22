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

module.exports = {
    addPodcast,
    getPaginatedPodcast
}