var movieDB = [
    {
        title: "Searching",
        rating: 4.5,
        hasWatched: false
    },
    {
        title: "Training Day",
        rating: 5,
        hasWatched: true
    },
    {
        title: "Crazy Rich Asians",
        rating: 4,
        hasWatched: false
    }
]

function printDB() {
    movieDB.forEach(function(key) {
        // console.log(key)});
        if (key.hasWatched) {
            console.log("You have watched " + "\"" + key.title + "\"" + " - " + key.rating + " stars"
                    );
        } else {
            console.log("You not have watched " + "\"" + key.title + "\"" + " - " + key.rating + " stars");
        }
    });
}

printDB();