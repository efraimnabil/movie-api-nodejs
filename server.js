const http = require("http");
require("dotenv").config();
const getReq = require("./methods/get-request")
const getPost = require("./methods/post-request")
const getPut = require("./methods/put-request")
const getDelete = require("./methods/delete-request")

let movies = require("./data/movie.json")

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
    req.movies = movies;
    switch (req.method) {
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            getPost(req, res);
            break;
        case "PUT":
            getPut(req, res);
            break;
        case "DELETE":
            getDelete(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ title: "Not Found", message: "Route Not Found" }));
            res.end();
    }
})

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
})