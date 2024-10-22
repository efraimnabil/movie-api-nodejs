class Router {
    routes = new Map()

    constructor(routers = []) {
        const routes = routers.map(( router ) => {
            return router.routes
        });
        const flatRoutes = routes.flatMap((mp) => [...mp])
        this.routes = new Map(flatRoutes)
    }

    use(req, res) {
        if (this.routes.has(req.method)) {
            for (const endPoint of this.routes.get(req.method)) {
                if (this.match(endPoint.url, req)) {
                    return endPoint.handler(req, res);
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

    set(method, url, handler) {
        if (!this.routes.has(method)) {
            this.routes.set(method, [])
        }
        this.routes.get(method).push({ url, handler });
    }

    get(url, handler) {
        this.set("GET", url, handler);
    }

    post(url, handler) {
        this.set("POST", url, handler);
    }

    put(url, handler) {
        this.set("PUT", url, handler);
    }

    delete(url, handler) {
        this.set("DELETE", url, handler);
    }
}

module.exports = Router;