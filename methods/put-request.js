const crypto = require("crypto");
const requestBodyParser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");

module.exports = async (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];

    const regexV4 = new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );

    if (!regexV4.test(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "Id is not valid" }));
    } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
        try {
            let body = await requestBodyParser(req);
            const index = req.movies.findIndex((movie) => {
                return movie.id === id;
            });
            if (index === -1) {
                res.statusCode = 404;
                res.write(JSON.stringify({ title: "Not Found", message: "Movie Not Found" }));
                res.end();
            }
            else {
                req.movies[index] = { id, ...body };
                writeToFile(req.movies);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(req.movies));
            }
        } catch (error) {
            console.log(error)
            res.writeHead(400, { "content-Type": "application/json" })
            res.end(JSON.stringify({ title: "Validation Failed", message: "Requist body is not valid" }));
        }
    }

};