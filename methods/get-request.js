const Router = require("../util/Router");
const { isValidIdMiddleware } = require("../validators/common");

function getAllMovies(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
}

function getMovieByID(req, res) {
    const id = req.params.id;
    let filteredMovie = req.movies.filter((movie) => movie.id === id);
    if (filteredMovie.length > 0) {
        res.statusCode = 200;
        res.write(JSON.stringify(filteredMovie));
        res.end();
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ title: "Not Found", message: "Movie Not Found" }));
        res.end();
    }
}

const getRouters = new Router();

getRouters.get("/api/movies", getAllMovies);
getRouters.get("/api/movies/:id", isValidIdMiddleware, getMovieByID);

module.exports = getRouters;
