import { IncomingMessage, ServerResponse } from "http";
import esClient from '../utils/elasticSearchSetup';
import writeDataToFile from "../utils/write-to-file";

function getAllMovies(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));  
    res.end();
}

function getMovieByID(req: IncomingMessage, res: ServerResponse) {
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

function deleteMovie(req: IncomingMessage, res: ServerResponse) {
    const id = req.params.id;
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
        writeDataToFile(req.movies);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies));
    }
}

async function addMovie(req: IncomingMessage, res: ServerResponse) {
    try {
        const { body } = req;
        body.id = crypto.randomUUID();
        req.movies.push(body);
        writeDataToFile(req.movies);
        res.writeHead(201, { "content-Type": "application/json" });
        res.end();
    } catch (error) {
        res.writeHead(400, { "content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "Requist body is not valid" }));
    }
}

async function updateMovie(req: IncomingMessage, res: ServerResponse) {
    const id = req.params.id; 

    try {
        const body = req.body;
        console.log("body from here", body);

        const index = (req as any).movies.findIndex((movie: { id: string }) => {
            return movie.id === id;
        });
        console.log("req.movies from update", req.movies)

        if (index === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Not Found", message: "Movie Not Found" }));
        } else {
            (req as any).movies[index] = { id, ...body };
            writeDataToFile((req as any).movies); 
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify((req as any).movies));
        }
    } catch (error) {
        console.error(error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "Request body is not valid" }));
    }
}

async function searchMovies(req: IncomingMessage, res: ServerResponse) {
    const { query } = req.query;

    try {
        const response = await esClient.search({
            index: 'movies',
            body: {
                query: {
                    multi_match: {
                        query,
                        fields: ['title', 'genre', 'year']
                    }
                }
            }
        });

        const results = response.hits.hits.map(hit => hit._source);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ results }));
    } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "An error occurred during the search" }));
    }
}

export { addMovie, deleteMovie, getAllMovies, getMovieByID, searchMovies, updateMovie };
