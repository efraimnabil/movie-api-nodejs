import crypto from "crypto";
import { IncomingMessage, ServerResponse } from "http";
import Router from "../core/Router";
import writeToFile from "../util/write-to-file";

async function addMovie(req: IncomingMessage, res: ServerResponse) {
    try {
        const { body } = req;
        body.id = crypto.randomUUID();
        req.movies.push(body);
        writeToFile(req.movies);
        res.writeHead(201, { "content-Type": "application/json" });
        res.end();
    } catch (error) {
        res.writeHead(400, { "content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "Requist body is not valid" }));
    }
}

const postRoutes = new Router();
postRoutes.post("/api/movies", addMovie);

export default postRoutes