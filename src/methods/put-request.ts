import { IncomingMessage, ServerResponse } from "http";
import Router from "../core/Router";
import writeToFile from "../util/write-to-file";
import { isValidIdMiddleware } from "../validators/common";

async function updateMovie(req: IncomingMessage, res: ServerResponse) {
    const id = req.params.id; 

    try {
        const body = req.body;
        console.log(body);

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

putRouters.put("/api/movies/:id", isValidIdMiddleware, updateMovie);

export default putRouters; 
