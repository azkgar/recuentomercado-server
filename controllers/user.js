const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");

function signUp(req,res) {
    const user = new User();
    const {name, lastname, email, password, repeatPassword} = req.body;
    user.name = name;
    user.lastname = lastname;
    user.email = email.toLowerCase();
    user.role = "admin";
    user.active = false;

    if(!password || !repeatPassword) {
        res.status(404).send({message: "El campo de contraseña es obligatorio."});
    } else {
        if(password !== repeatPassword){
            res.status(404).send({message: "Las contraseñas deben ser iguales."});
        } else {
            bcrypt.hash(password, null, null, function(err, hash) {
                if(err) {
                    res.status(500).send({message: "Error al encriptar la contraseña."});
                } else {
                    user.password = hash;

                    user.save((err, userStored) => {
                        if(err) {
                            res.status(500).send({message: err});
                        } else {
                            if(!userStored){
                                res.status(404).send({message: "Error al crear el usuario."});
                            } else {
                                res.status(200).send({user: userStored});
                            }
                        }
                    });
                }
            });
        }
    }
}

module.exports = {
    signUp
}