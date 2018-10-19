var express         = require("express"), 
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Hike            = require("./models/hike"),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    seedDB          = require("./seeds");

var commentRoutes = require("./routes/comments"),
    hikesRoutes = require("./routes/hikes"),
    authRoutes = require("./routes/auth");


mongoose.connect("mongodb://localhost/yelp_camp_v7", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//passport config

app.use(require("express-session")({
    secret: "one hundred",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

<<<<<<< HEAD
app.use(authRoutes);
app.use("/hikes", hikesRoutes);
app.use("/hikes/:id/comments", commentRoutes);
=======
app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/hikes", function(req, res) {
    Hike.find({}, function(err, allHikes) {
        if(err) {
            console.log(err);
        } else {
            res.render("hikes/hikes", {hikes: allHikes, currentUser: req.user});
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
    res.render("hikes/new");
})

// SHOW

app.get("/hikes/:id", function(req, res) {
    Hike.findById(req.params.id).populate("comments").exec((function (err, foundHike) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundHike);
            res.render("hikes/show", { hike : foundHike });
        }
    }));
});

// ====== Comments Routes ========

app.get("/hikes/:id/comments/new", isLoggedIn, function(req, res) {
    Hike.findById(req.params.id, function(err, hike) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { hike: hike });
        }
    })
})

app.post("/hikes/:id/comments", isLoggedIn, function(req, res) {
    Hike.findById(req.params.id, function(err, hike) {
        if (err) {
            console.log(err);
            res.redirect("/hikes");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    hike.comments.push(comment);
                    hike.save();
                    res.redirect("/hikes/" + hike._id);
                }
            });

        }
    });
})

// auth route

app.get("/register", function(req, res) {
    res.render("register");
})

app.post("/register", function(req, res) {
    var newUser = new User( { username: req.body.username })
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render(register);
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/hikes");
        })
    })
});


app.get("/login", function(req, res) {
    res.render("login");
})

app.post("/login", passport.authenticate("local", 
    { 
        successRedirect: "/hikes", 
        failureRedirect: "/login"
    }), function(req, res) {

})

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/hikes");
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
>>>>>>> 3735608bc36beeea99d17d4ebd861ce228680542

app.listen(3000, function() {
    console.log("Server has started on port 3000");
});