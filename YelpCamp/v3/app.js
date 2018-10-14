var express     = require("express"), 
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Hike        = require("./models/hike"),
    seedDB     = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp_v3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/hikes", function(req, res) {
    Hike.find({}, function(err, allHikes) {
        if(err) {
            console.log(err);
        } else {
            res.render("hikes", {hikes: allHikes});
        }
    })
    // res.render("hikes", {hikes: hikes});
});

app.post("/hikes", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newHike = {name : name, image : image};
    Hike.create(newHike, function(err, newlyCreated) {
        if (err) {
            console.log("Hike not added.")
        } else {
            console.log(newlyCreated);
            res.redirect("/hikes");
        }
    });
});



app.get("/hikes/new", function(req, res) {
    res.render("new");
})

// SHOW

app.get("/hikes/:id", function(req, res) {
    Hike.findById(req.params.id).populate("comments").exec((function (err, foundHike) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundHike);
            res.render("show", { hike : foundHike });
        }
    }));
});

app.listen(3000, function() {
    console.log("Server has started on port 3000");
});