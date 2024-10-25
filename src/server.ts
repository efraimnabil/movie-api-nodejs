import * as dotenv from 'dotenv';
import { addMovie, deleteMovie, getAllMovies, getMovieByID, updateMovie } from './routes/movieRoutes';
import { isValidIdMiddleware } from './validators';
import { IncomingMessage, ServerResponse } from 'http';
import Router from 'express-minimal';
import Movies from '../data/movies.json'
dotenv.config();

const PORT = process.env.PORT || 5001;

const app = new Router();

const setMoviesMiddleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    req.movies = Movies
    console.log("req.movies", req.movies)
    next();
};

app.use(app.bodyParser);
app.use(setMoviesMiddleware);

app.get("/api/movies", getAllMovies);
app.get("/api/movies/:id", isValidIdMiddleware, getMovieByID);
app.post("/api/movies", addMovie);
app.put("/api/movies/:id", isValidIdMiddleware, updateMovie);
app.delete("/api/movies/:id", isValidIdMiddleware, deleteMovie);

app.startServer(Number(PORT), () => {
    console.log("server listen on port: ", PORT)
});
