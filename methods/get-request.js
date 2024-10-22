const Router = require("../util/Router");
const { isValidId } = require("../validators/common");

function getAllMovies(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
}

function getMovieByID(req, res) {
    
    const id = req.params.id;
    if (isValidId(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "Id is not valid" }));
        return;
    }
    res.setHeader("Content-Type", "application/json");
    let filteredMovie = req.movies.filter((movie) => movie.id === id);
    if (filteredMovie.length > 0) {
        res.statusCode = 200;
        res.write(JSON.stringify(filteredMovie));
        res.end();
    }
    else {
        res.statusCode = 404;
        res.write(JSON.stringify({ title: "Not Found", message: "Movie Not Found" }));
        res.end();
    }
}

const getRouters = new Router();

getRouters.get("/api/movies", getAllMovies);
getRouters.get("/api/movies/:id", getMovieByID)

module.exports = getRouters