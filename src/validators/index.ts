import { IncomingMessage, ServerResponse } from "http";

const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

function isValidIdMiddleware(req: IncomingMessage, res: ServerResponse, next: () => void): void {
    const id = req.params.id; 
    if (!id || !regexV4.test(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "Id is not valid" }));
        return;
    }
    next();
}

export { isValidIdMiddleware };
