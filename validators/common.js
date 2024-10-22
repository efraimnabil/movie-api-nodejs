const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

function isValidIdMiddleware(req, res, next) {
    const id = req.params.id;
    if (!regexV4.test(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Validation Failed", message: "Id is not valid" }));
        return;
    }
    next();
}

module.exports = { isValidIdMiddleware };
