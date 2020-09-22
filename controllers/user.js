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

function signIn(req,res) {
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;

    User.findOne({email}, (err,userStored) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!userStored) {
                res.status(404).send({message: "Usuario no encontrado."});
            } else {
                bcrypt.compare(password, userStored.password, (err,check) => {
                    if(err) {
                        res.status(500).send({message: "Error del servidor."});
                    } else if(!check) {
                        res.status(404).send({message: "Nombre de usuario o contraseña inválidos."});
                    } else {
                        if(!userStored.active) {
                            res.status(200).send({code: 200, message: "El usuario no está activo."});
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            });
                        }
                    }
                });
            }
        }
    });
}

function getUsers(req,res) {
    User.find().then(users => {
        if(!users){
            res.status(404).send({message: "No se encontraron usuarios."});
        } else {
            res.status(200).send({users});
        }
    });
}

function getUsersActive(req,res){
    const query = req.query;

    User.find({active: query.active}).then(users => {
        if(!users) {
            res.status(404).send({message: "No se encontraron usuarios activos."});
        } else {
            res.status(200).send({users});
        }
    });
}

async function updateUser(req,res){
    let userData = req.body;
    userData.email = req.body.email.toLowerCase();
    const params = req.params;

    if(userData.password) {
        await bcrypt.hash(userData.password, null, null, (err,hash) => {
            if (err) {
                res.status(500).send({message: "Error al encriptar la contraseña."});
            } else {
                userData.password = hash;
            }
        });
    }

    User.findByIdAndUpdate({_id: params.id}, userData, (err, userUpdate) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!userUpdate) {
                res.status(404).send({message: "Usuario no encontrado."});
            } else {
                res.status(200).send({message: "Usuario actualizado."});
            }
        }
    });
}

function activateUser(req,res){
    const {id} = req.params;
    const {active} = req.body;

    User.findByIdAndUpdate(id, {active}, (err, userStored) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!userStored) {
                res.status(404).send({message: "Usuario no encontrado."});
            } else {
                if(active === true){
                    res.status(200).send({message: "Usuario activado."});
                } else {
                    res.status(200).send({message: "Usuario desactivado."});
                }
            }
        }
    });
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUsersActive,
    updateUser,
    activateUser
}