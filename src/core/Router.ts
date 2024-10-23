import { IncomingMessage, ServerResponse } from "http";

interface Endpoint {
    url: string;
    handlers: Array<(req: IncomingMessage, res: ServerResponse, next: () => void) => void>;
}

class Router {
    private routes: Map<string, Endpoint[]>;

    constructor(routers: Router[] = []) {

        const flatRoutes = routers.flatMap(router => [...router.routes.entries()]);
        this.routes = new Map(flatRoutes);
    }

    public use(req: IncomingMessage, res: ServerResponse): void {
        const methodRoutes = this.routes.get(req.method || "");
        if (methodRoutes) {
            for (const endPoint of methodRoutes) {
                if (this.match(endPoint.url, req)) {
                    this.runHandlers(endPoint.handlers, req, res);
                    return;
                }
            }
        }
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ title: "Not Found", message: "Route Not Found" }));
        res.end();
    }

    private match(url: string, req: IncomingMessage): boolean {
        const urlPath = url.split("/");
        const reqUrlPath = req.url?.split("/") || [];

        if (urlPath.length !== reqUrlPath.length) return false;

        for (let i = 0; i < urlPath.length; i++) {
            if (urlPath[i][0] === ':') {
                req.params[urlPath[i].slice(1)] = reqUrlPath[i];
                continue;
            }
            if (urlPath[i] !== reqUrlPath[i]) return false;
        }
        return true;
    }

    private runHandlers(handlers: Array<(req: IncomingMessage, res: ServerResponse, next: () => void) => void>, req: IncomingMessage, res: ServerResponse): void {
        let index = 0;
        const next = () => {
            if (index < handlers.length) {
                const handler = handlers[index++];
                handler(req, res, next);
            }
        };
        next();
    }

    private set(method: string, url: string, handlers: Array<(req: IncomingMessage, res: ServerResponse, next: () => void) => void>): void {
        if (!this.routes.has(method)) {
            this.routes.set(method, []);
        }
        this.routes.get(method)!.push({ url, handlers });
    }

    public get(url: string, ...handlers: Array<(req: IncomingMessage, res: ServerResponse, next: () => void) => void>): void {
        this.set("GET", url, handlers);
    }

    public post(url: string, ...handlers: Array<(req: IncomingMessage, res: ServerResponse, next: () => void) => void>): void {
        this.set("POST", url, handlers);
    }

    public put(url: string, ...handlers: Array<(req: IncomingMessage, res: ServerResponse, next: () => void) => void>): void {
        this.set("PUT", url, handlers);
    }

    public delete(url: string, ...handlers: Array<(req: IncomingMessage, res: ServerResponse, next: () => void) => void>): void {
        this.set("DELETE", url, handlers);
    }
}

export default Router;
