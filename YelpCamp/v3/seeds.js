var mongoose = require("mongoose");
var Hike = require("./models/hike");
var Comment = require("./models/comment");

var data = [
    {
        name: "Mailbox Peak", 
        image: "https://i.pinimg.com/originals/8d/1c/1f/8d1c1fbfa1d9d2451f2a1016386241da.jpg",
        description: "blah blah"
    },
    {
        name: "Rattlesnake", 
        image: "https://beautifulwashington.com/images/snoqualmie-region/view-from-rattlesnake-ledge-trail-2.jpg",
        description: "blah blah"
    },
    {
        name: "Lake 22", 
        image: "https://cdn-assets.alltrails.com/uploads/photo/image/10745071/extra_large_a37368733cda9ebaf460d85fec634cae.jpg",
        description: "blah blah"
    }
]

function seedDB() {
    Hike.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed hikes!");
        Comment.remove({}, function(err) {
            if(err) {
                console.log(err);
            }
            console.log("removed comments");
        })

        // add hikes

        data.forEach(function(seed) {
            Hike.create(seed, function(err, hike) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added hike");
                    // add comment
                    Comment.create(
                        {
                            text: "Great workout!",
                            author: "Anonymous"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                // console.log(typeof Hike.comments);
                                hike.comments.push(comment);
                                hike.save();
                                console.log("created new comment");
                            }
                        }
                    )
                }
            })
        })
    });
} 

module.exports = seedDB;

