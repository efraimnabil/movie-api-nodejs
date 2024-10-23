import { IncomingMessage, ServerResponse } from "http";
import writeToFile from "../util/write-to-file";
import crypto from "crypto"
import requestBodyParser from "../util/body-parser"
import Router from "../core/Router";

async function addMovie(req: IncomingMessage, res: ServerResponse) {
    try {
        let body = await requestBodyParser(req);
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