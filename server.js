const http = require("http");
require("dotenv").config();
const getRoutes = require("./methods/get-request")
const postRoutes = require("./methods/post-request")
const putRoutes = require("./methods/put-request")
const deleteRoutes = require("./methods/delete-request")
const Router = require("./util/Router");


let movies = require("./data/movies.json")

const PORT = process.env.PORT || 5001;

const router = new Router([getRoutes, postRoutes, deleteRoutes, putRoutes]);

const server = http.createServer((req, res) => {
    req.movies = movies;
    req.params = {};
    router.use(req, res);
})

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
})