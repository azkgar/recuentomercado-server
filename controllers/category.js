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

function getCategories(req,res) {
    Category.find().sort({order: "asc"}).exec((err, categoriesStored) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!categoriesStored) {
                res.status(404).send({message: "No se encontró ninguna categoría."});
            } else {
                res.status(200).send({category: categoriesStored});
            }
        }
    });
}

function updateCategory(req,res) {
    let categoryData = req.body;
    const params = req.params;

    Category.findByIdAndUpdate(params.id, categoryData, (err, categoryUpdate) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!categoryUpdate) {
                res.status(404).send({message: "No se encontró la categoría."});
            } else {
                res.status(200).send({message: "Categoría actualizada."});
            }
        }
    });
}

function activateCategory(req,res) {
    const {id} = req.params;
    const {active} = req.body;

    Category.findByIdAndUpdate(id, {active}, (err, categoryUpdate) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!categoryUpdate) {
                res.status(404).send({message: "No se encontró la categoría."});
            } else {
                if(active === true) {
                    res.status(200).send({message: "Categoría activada"});
                } else {
                    res.status(200).send({message: "Categoría desactivada."});
                }
            }
        }
    });
}

function deleteCategory(req,res) {
    const {id} = req.params;

    Category.findByIdAndRemove(id, (err, categoryDeleted) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!categoryDeleted) {
                res.status(404).send({message: "Categoría no encontrada."});
            } else {
                res.status(200).send({message: "Categoría eliminada."});
            }
        }
    });
}

function getCategory(req,res) {
    const{url} = req.params;

    Category.find({"url": url}).exec((err, result) => {
        if(err) {
            res.status(500).send({message: "Error del servidor"});
        } else {
            if(!result) {
                res.status(404).send({message: "No se encontró la categoría."});
            } else {
                res.status(200).send({category: result});
            }
        }
    });
}

function getCategoryTag(req,res) {
    const {tag} = req.params;

    Category.find({"tag": tag}).exec((err, result) => {
        if(err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if(!result) {
                res.status(404).send({message: "Error del servidor."});
            } else {
                res.status(200).send({category: result});
            }
        }
    });
}

module.exports = {
    addCategory,
    getCategories,
    updateCategory,
    activateCategory,
    deleteCategory,
    getCategory,
    getCategoryTag
}