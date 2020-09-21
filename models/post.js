const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const PostSchema = Schema({
    title: String,
    url: {
        type: String,
        unique: true
    },
    content: String,
    date: Date,
    categories: Array,
    username: String,
    cover: String,
    pinterest: String,
    instagram: String,
    description: String,
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);