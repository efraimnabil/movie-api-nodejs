class Router {
    routes = new Map()

    constructor(routers = []) {
        const routes = routers.map((router) => {
            return router.routes;
        });
        const flatRoutes = routes.flatMap((mp) => [...mp]);
        this.routes = new Map(flatRoutes);
    }

    use(req, res) {
        if (this.routes.has(req.method)) {
            for (const endPoint of this.routes.get(req.method)) {
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

    match(url, req) {
        const urlPath = url.split("/");
        const reqUrlPath = req.url.split("/");

        if (urlPath.length != reqUrlPath.length) return false;
        for (let i = 0; i < urlPath.length; i++) {
            if (urlPath[i][0] === ':') {
                req.params[urlPath[i].slice(1)] = reqUrlPath[i];
                continue;
            }
            if (urlPath[i] != reqUrlPath[i]) return false;
        }
        return true;
    }

    runHandlers(handlers, req, res) {
        let index = 0;
        const next = () => {
            if (index < handlers.length) {
                const handler = handlers[index++];
                handler(req, res, next);
            }
        };
        next();
    }

    set(method, url, handlers) {
        if (!this.routes.has(method)) {
            this.routes.set(method, []);
        }
        this.routes.get(method).push({ url, handlers });
    }

    get(url, ...handlers) {
        this.set("GET", url, handlers);
    }

    post(url, ...handlers) {
        this.set("POST", url, handlers);
    }

    put(url, ...handlers) {
        this.set("PUT", url, handlers);
    }

    delete(url, ...handlers) {
        this.set("DELETE", url, handlers);
    }
}

module.exports = Router;
