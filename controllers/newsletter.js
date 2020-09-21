const Newsletter = require("../models/newsletter");

function suscribeEmail(req,res){
    const {email, name} = req.body;
    const newsletter = new Newsletter()

    if(!email || !name) {
        res.status(404).send({message: "Todos los campos son obligatorios."});
    } else {
        newsletter.email = email.toLowerCase();
        newsletter.name = name;
        
        newsletter.save((err, newsletterStore) => {
            if(err) {
                res.status(500).send({code: 500, message: "El email ya está registrado en nuestra lista."});
            } else {
                if(!newsletterStore) {
                    res.status(404).send({code: 400, message: "Error al registrar usuario en la lista."});
                } else {
                    res.status(200).send({code: 200, message: "Usuario registrado correctamente"});
                }
            }
        });
    }
}

module.exports = {
    suscribeEmail
}