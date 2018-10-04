// app

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true}));

// title, image,

// MONGOOSE Config

mongoose.connect("mongodb://localhost/rest_blog", { useNewUrlParser: true });

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type : Date, default: Date.now }
})

var Blog = mongoose.model('Blog', blogSchema);

// REST routes

app.get("/", function(req, res) {
    res.redirect("/blogs");
})

//INDEX

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("Error");
        } else {
            res.render("index", { blogs: blogs});
        }
    });
});

//NEW

app.get("/blogs/new", function(req, res) {
    res.render("new");
})

// CREATE

app.post("/blogs", function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
});


// SHOW 

app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog : foundBlog});
        }
    })
})

// EDIT

app.get("/blogs/:id/edit", function(req,res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog : foundBlog});
        }
    })
});

// UPDATE ROUTE

app.put("/blogs/:id", function(req, res) {
    res.send("Update route");
})

app.listen(3000, function() {
    console.log("Server is running");
});