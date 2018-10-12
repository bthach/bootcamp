// app

var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended : true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

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
    console.log(req.body);
    req.body.blog.body= req.sanitize(req.body.blog.body);
    console.log("=====================");
    console.log(req.body);
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
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findOneAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

// DELETE ROUTE

app.delete("/blogs/:id", function(req, res) {
    Blog.findOneAndDelete(req.params.id, function(err) {
        if (err) {
            res.send("error");
        } else {
            res.redirect("/blogs");
        }
    })
})

app.listen(3000, function() {
    console.log("Server is running");
});