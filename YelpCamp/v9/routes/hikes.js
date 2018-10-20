var express = require("express");
var router = express.Router();
var Hike = require("../models/hike");

router.get("/", function(req, res) {
    Hike.find({}, function(err, allHikes) {
        if(err) {
            console.log(err);
        } else {
            res.render("hikes/hikes", {hikes: allHikes, currentUser: req.user});
        }
    })
    // res.render("hikes", {hikes: hikes});
});

router.post("/", isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newHike = {name : name, image : image, description: desc, author: author};
    Hike.create(newHike, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            console.log(newlyCreated);
            res.redirect("/hikes");
        }
    });
});


router.get("/new", isLoggedIn, function(req, res) {
    res.render("hikes/new");
})

// SHOW

router.get("/:id", function(req, res) {
    Hike.findById(req.params.id).populate("comments").exec((function (err, foundHike) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundHike);
            res.render("hikes/show", { hike : foundHike });
        }
    }));
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;