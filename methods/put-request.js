const requestBodyParser = require("../util/body-parser");
const Router = require("../util/Router");
const writeToFile = require("../util/write-to-file");
const { isValidId } = require("../validators/common");

async function updateMovie(req, res) {
    const id = req.params.id;
    if (!isValidId(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "Id is not valid" }));
        return;
    }

    try {
        let body = await requestBodyParser(req);
        const index = req.movies.findIndex((movie) => {
            return movie.id === id;
        });
        if (index === -1) {
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found", message: "Movie Not Found" }));
            res.end();
        }
        else {
            req.movies[index] = { id, ...body };
            writeToFile(req.movies);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(req.movies));
        }
    } catch (error) {
        console.log(error)
        res.writeHead(400, { "content-Type": "application/json" })
        res.end(JSON.stringify({ title: "Validation Failed", message: "Requist body is not valid" }));
    }
}

const putRouters = new Router();

putRouters.put("/api/movies/:id", updateMovie)

module.exports = putRouters