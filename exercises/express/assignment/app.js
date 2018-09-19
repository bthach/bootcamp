var express = require('express');
var app = express();

app.get("/", function() {

});

app.get("/speak/pig", function(req, res) {
    res.send("The pig says oink!");
});

app.get("/speak/cow", function(req, res) {
    res.send("The cow says moo!");
});

app.get("/speak/dog", function(req, res) {
    res.send("The dog says woof!");
});

app.get("/repeat/hello/3", function(req, res) {
    res.send("hello hello hello!");
});

app.get("/repeat/hello5", function(req, res) {
    res.send("hello hello hello hello hello");
});

app.get("/repeat/blah/2", function(req, res) {
    res.send("blah blah");
});

app.get("*", function(req, res) {
    res.send("WYD?");
});

app.listen(3000);