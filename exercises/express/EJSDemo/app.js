var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home")
})

app.get("/posts", function(req, res) {
    var posts = [
        {title: "1 hunnit", author: "A"},
        {title: "2 hunnit", author: "B"}
    ];

    res.render("posts", {posts: posts})
})


app.listen(3000, function(){
    console.log("Server listening on 3000");
});