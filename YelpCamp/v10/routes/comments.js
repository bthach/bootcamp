var express = require("express");
var router = express.Router( {mergeParams: true});
var Hike = require("../models/hike");
var Comment = require("../models/comment");

router.get("/new", isLoggedIn, function(req, res) {
    Hike.findById(req.params.id, function(err, hike) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { hike: hike });
        }
    })
})

router.post("/", isLoggedIn, function(req, res) {
    Hike.findById(req.params.id, function(err, hike) {
        if (err) {
            console.log(err);
            res.redirect("/hikes");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username to comment
                    
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
    
                    //save comment
                    comment.save();
                    hike.comments.push(comment);
                    hike.save();
                    res.redirect("/hikes/" + hike._id);
                }
            });

        }
    });
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
