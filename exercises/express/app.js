var express = require("express");

var app = express();

app.get("/", function(req, res) {
    res.send("Hello there");
})

app.get("/bye", function(req, res) {
    res.send("Bye!");
})

app.get("/cars", function(req, res) {
    res.send("vroom!");
})

app.get("/r/:subredditName", function(req, res) {
    console.log(req.path);
    res.send("reddit");
})

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    console.log(req.params);
    res.send("comments");
})

app.get("*", function(req, res) {
    res.sendStatus(404);
})


app.listen(3000);