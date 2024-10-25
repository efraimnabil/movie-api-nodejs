import * as dotenv from 'dotenv';
import { addMovie, deleteMovie, getAllMovies, getMovieByID, updateMovie } from './routes/movieRoutes';
import bodyParser from './util/body-parser';
import { isValidIdMiddleware } from './validators/common';
import { IncomingMessage, ServerResponse } from 'http';
import Router from 'express-minimal';
import Movies from '../data/movies.json'
dotenv.config();

const PORT = process.env.PORT || 5001;

const router = new Router([]);
let movies
const setMoviesMiddleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    req.movies = Movies
    console.log("req.movies", req.movies)
    next();
};


router.get("/api/movies", getAllMovies);
router.get("/api/movies/:id", isValidIdMiddleware, getMovieByID);
router.post("/api/movies", addMovie);
router.put("/api/movies/:id", isValidIdMiddleware, updateMovie);
router.delete("/api/movies/:id", isValidIdMiddleware, deleteMovie);
router.addMiddleware(setMoviesMiddleware);
router.addMiddleware(bodyParser);

router.startServer(Number(PORT));
