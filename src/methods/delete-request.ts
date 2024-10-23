import { ServerResponse } from "http";
import { IncomingMessage } from "http";
import Router from '../core/Router';

import { isValidIdMiddleware } from "../validators/common"; 
import writeToFile from "../util/write-to-file";

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
        writeToFile(req.movies);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies));
    }
}

const deleteRouters = new Router();

deleteRouters.delete("/api/movies/:id", isValidIdMiddleware, deleteMovie)

export default deleteRouters
