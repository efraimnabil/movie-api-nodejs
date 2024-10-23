import { IncomingMessage, ServerResponse } from 'http';

const bodyParser = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        if (body) {
            try {
                req.body = JSON.parse(body);
                console.log("Parsed Body:", req.body);
            } catch (error) {
                console.warn("Invalid JSON, proceeding with empty body");
                req.body = {};
            }
        } else {
            req.body = {};
        }

        next();
    });

    req.on('error', () => {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Bad Request", message: "Error processing body" }));
    });
};

export default bodyParser;
