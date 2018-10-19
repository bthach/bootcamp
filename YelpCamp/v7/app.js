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

app.use(authRoutes);
app.use("/hikes", hikesRoutes);
app.use("/hikes/:id/comments", commentRoutes);

app.listen(3000, function() {
    console.log("Server has started on port 3000");
});