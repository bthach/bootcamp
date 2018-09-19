var express = require('express');
var app = express();
console.log('Server listening on 3000');

app.get("/", function(req, res) {
    res.send("Welcome!");
});

// app.get("/speak/pig", function(req, res) {
//     res.send("The pig says oink!");
// });

// app.get("/speak/cow", function(req, res) {
//     res.send("The cow says moo!");
// });

// app.get("/speak/dog", function(req, res) {
//     res.send("The dog says woof!");
// });

// var cow = "moo!";
// var pig = "oink!";
// var dog = "woof!";
var sound = "";

app.get("/speak/:animalName", function(req, res) {
        console.log(req.params);

        if (req.params.animalName === "cow") {
            sound = "moo!";
        } else if (req.params.animalName === "pig") {
            sound = "oink!";
        } else if (req.params.animalName === "dog") {
            sound = "woof!";
        }

        res.send("The " + req.params.animalName + " says " + sound);
    });

// app.get("/repeat/hello/3", function(req, res) {
//     res.send("hello hello hello!");
// });

// app.get("/repeat/hello5", function(req, res) {
//     res.send("hello hello hello hello hello");
// });

// app.get("/repeat/blah/2", function(req, res) {
//     res.send("blah blah");
// });

app.get("/repeat/:phrase/:num", function(req, res) {
    var count = 1;
    var num = req.params.num;
    var phrase = req.params.phrase;
    var repeat = " " + req.params.phrase;

    if (num === 0) {
        res.send("");
    } else if (num === 1) {
        res.send(phrase);
    } else {
        while (count < num) {
            phrase += repeat;
            count++;
        }
        res.send(phrase);
    }
})

app.get("*", function(req, res) {
    res.send("WYD?");
});

app.listen(3000);