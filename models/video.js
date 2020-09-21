const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const VideoSchema = Schema({
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
    description: String
});

VideoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Video", VideoSchema);