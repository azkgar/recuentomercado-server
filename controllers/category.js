const Category = require("../models/category");

function addCategory(req,res) {
    const {tag, active, avatar, order, url} = req.body;
    const category = new Category();
    category.tag = tag;
    category.active = active;
    category.avatar = avatar;
    category.order = order;
    category.url = url;

    category.save((err, createdCategory) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!createdCategory) {
                res.status(404).send({message: "Error al crear la categoría."});
            } else {
                res.status(200).send({message: "Categoría creada."});
            }
        }
    });
}

module.exports = {
    addCategory
}