import Router from '../core/Router';
import { isValidIdMiddleware } from '../validators/common';
import { IncomingMessage, ServerResponse } from 'http';

interface Movie {
    id: string;
    title: string;
}

function getAllMovies(req: IncomingMessage, res: ServerResponse): void {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));  
    res.end();
}

function getMovieByID(req: IncomingMessage, res: ServerResponse): void {
    const id = req.params.id;  
    const filteredMovie = req.movies.filter((movie) => movie.id === id) || [];
    if (filteredMovie.length > 0) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
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

export default getRouters;
