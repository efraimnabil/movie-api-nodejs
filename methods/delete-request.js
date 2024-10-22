const Router = require("../util/Router");
const writeToFile = require("../util/write-to-file");
const { isValidId } = require("../validators/common");

function deleteMovie(req, res) {
    const id = req.params.id;
    if (!isValidId(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "Id is not valid" }));
        return;
    }
    const index = req.movies.findIndex((movie) => {
        return movie.id === id;
    });
    if (index === -1) {
        res.statusCode = 404;
        res.write(JSON.stringify({ title: "Not Found", message: "Movie Not Found" }));
        res.end();
    }
    else {
        req.movies.splice(index, 1);
        writeToFile(req.movies);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies));
    }
}

const deleteRouters = new Router();

deleteRouters.delete("/api/movies/:id", deleteMovie)

module.exports = deleteRouters
