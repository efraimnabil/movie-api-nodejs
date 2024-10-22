const crypto = require("crypto");
const requestBodyParser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
const Router = require("../util/Router");

async function addMovie(req, res){
    try {
        let body = await requestBodyParser(req);
        body.id = crypto.randomUUID();
        req.movies.push(body);
        writeToFile(req.movies);
        res.writeHead(201, { "content-Type": "application/json" })
        res.end();
    } catch (error) {
        res.writeHead(400, { "content-Type": "application/json" })
        res.end(JSON.stringify({ title: "Validation Failed", message: "Requist body is not valid" }));
    }
}

const postRoutes = new Router();
postRoutes.post("/api/movies", addMovie);

module.exports = postRoutes;