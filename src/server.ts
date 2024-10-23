import * as dotenv from 'dotenv';
import moviesData from '../data/movies.json';
import Router from './core/Router';
import { addMovie, deleteMovie, getAllMovies, getMovieByID, updateMovie } from './routes /movieRoutes';
import bodyParser from './util/body-parser';
import { isValidIdMiddleware } from './validators/common';

dotenv.config();

const PORT = process.env.PORT || 5001;

const router = new Router([]);

router.get("/api/movies", getAllMovies);
router.get("/api/movies/:id", isValidIdMiddleware, getMovieByID);
router.post("/api/movies", addMovie);
router.put("/api/movies/:id", isValidIdMiddleware, updateMovie);
router.delete("/api/movies/:id", isValidIdMiddleware, deleteMovie)

router.addMiddleware(bodyParser);

router.startServer(Number(PORT), moviesData);