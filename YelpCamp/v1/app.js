var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var hikes = [
    {name: "Rattlesnake", image: "http://www.vacationloghome.com/_/rsrc/1392869453459/attractions/5.jpg"},
    {name: "Lake 22", image: "https://cdn-assets.alltrails.com/uploads/photo/image/10745071/extra_large_a37368733cda9ebaf460d85fec634cae.jpg"},
    {name: "Snow Lake", image: "https://media-cdn.tripadvisor.com/media/photo-s/01/1b/44/f1/snow-lake-in-mt-rainier.jpg"},
    {name: "Rattlesnake", image: "http://www.vacationloghome.com/_/rsrc/1392869453459/attractions/5.jpg"},
    {name: "Lake 22", image: "https://cdn-assets.alltrails.com/uploads/photo/image/10745071/extra_large_a37368733cda9ebaf460d85fec634cae.jpg"},
    {name: "Snow Lake", image: "https://media-cdn.tripadvisor.com/media/photo-s/01/1b/44/f1/snow-lake-in-mt-rainier.jpg"},
    {name: "Rattlesnake", image: "http://www.vacationloghome.com/_/rsrc/1392869453459/attractions/5.jpg"},
    {name: "Lake 22", image: "https://cdn-assets.alltrails.com/uploads/photo/image/10745071/extra_large_a37368733cda9ebaf460d85fec634cae.jpg"},
    {name: "Snow Lake", image: "https://media-cdn.tripadvisor.com/media/photo-s/01/1b/44/f1/snow-lake-in-mt-rainier.jpg"}
];

app.use(bodyParser.urlencoded({ extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/hikes", function(req, res) {
    res.render("hikes", {hikes: hikes});
});

app.post("/hikes", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var hike = { name : name, image : image};
    hikes.push(hike);
    res.redirect("/hikes");
});

app.get("/hikes/new", function(req, res) {
    res.render("new");
})

app.listen(3000, function() {
    console.log("Server has started on port 3000");
});