var express     = require("express"), 
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

var hikeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Hike = mongoose.model("Hike", hikeSchema);

// Hike.create(
//     {
//         name: "Rattlesnake",
//         image: "http://www.vacationloghome.com/_/rsrc/1392869453459/attractions/5.jpg",
//         description: "This is a easy hike"
//     }, function(err, hike) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("New Hike");
//             console.log(hike);
//                 }
//     });


app.use(bodyParser.urlencoded({ extended: true}));

app.set("view engine", "ejs");

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

app.get("/hikes/:id", function(req, res) {
    Hike.findById(req.params.id, function (err, foundHike) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", { hike : foundHike });

        }
    })
})

app.listen(3000, function() {
    console.log("Server has started on port 3000");
});