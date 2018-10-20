var mongoose = require("mongoose");
var Hike = require("./models/hike");
var Comment = require("./models/comment");

var data = [
    {
        name: "Mailbox Peak", 
        image: "https://i.pinimg.com/originals/8d/1c/1f/8d1c1fbfa1d9d2451f2a1016386241da.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Rattlesnake", 
        image: "https://beautifulwashington.com/images/snoqualmie-region/view-from-rattlesnake-ledge-trail-2.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Lake 22", 
        image: "https://cdn-assets.alltrails.com/uploads/photo/image/10745071/extra_large_a37368733cda9ebaf460d85fec634cae.jpg",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
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

