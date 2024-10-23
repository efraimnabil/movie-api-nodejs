import { IncomingMessage, ServerResponse } from "http";
import { isValidIdMiddleware } from "../validators/common"; 
import writeToFile from "../util/write-to-file";
import Router from "../core/Router";
import requestBodyParser from "../util/body-parser"

async function updateMovie(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const id = req.params.id; 

    try {
        const body = await requestBodyParser(req);
        const index = (req as any).movies.findIndex((movie: { id: string }) => {
            return movie.id === id;
        });

        if (index === -1) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Not Found", message: "Movie Not Found" }));
        } else {
            (req as any).movies[index] = { id, ...body }; 
            writeToFile((req as any).movies); 
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify((req as any).movies));
        }
    } catch (error) {
        console.error(error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "Request body is not valid" }));
    }
}

const putRouters = new Router();

putRouters.put("/api/movies/:id",isValidIdMiddleware, updateMovie);

export default putRouters; 
