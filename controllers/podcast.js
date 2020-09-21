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

module.exports = {
    addPodcast
}