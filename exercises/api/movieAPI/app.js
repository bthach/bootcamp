var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
})

app.get("/results", function(req, res) {
    var query = req.query.search;
    url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function (error, response, body) {
        if (error) {
            res.send("404");
        } else {
            var response = JSON.parse(body);
            res.render("results", { response : response });
            // res.send(response["Search"][0]["Title"]);
        }
    })
});

app.listen(3000, function() {
    console.log("App has started");
})

// &apikey=thewdb