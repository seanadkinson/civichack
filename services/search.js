
exports.init = function(app) {
    app.get('/search', function(req, res) {
        console.log("Searching...");
        res.send("OK");
    });
};
