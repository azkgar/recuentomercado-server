const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const {API_VERSION} = require("./config");

//Load routings
const userRoutes = require("./routers/user");
const authRoutes = require("./routers/auth");
const menuRoutes = require("./routers/menu");
const categoryRoutes = require("./routers/category");
const newsletterRoutes = require("./routers/newsletter");
const podcastRoutes = require("./routers/podcast");
const postRoutes = require("./routers/post");
const videoRoutes = require("./routers/video");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//Router Basic
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, categoryRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);
app.use(`/api/${API_VERSION}`, podcastRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);
app.use(`/api/${API_VERSION}`, videoRoutes);

module.exports = app;