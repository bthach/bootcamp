var numSquares = 6;
var colors = randomColors(numSquares);
var pickedColor = pickColor();

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplayed");
var messageDisplay = document.querySelector("#result");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
// var easyButton = document.getElementById("easyBtn")
// var hardButton = document.getElementById("hardBtn")
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setButtons();
    setSquares();
    reset();
}

function setButtons() {
    for (var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function (){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
    
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        })
    }
}

function setSquares(){
    for (var i = 0; i < squares.length; i++) {
        // add event listener to square
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
    
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct";
                resetButton.textContent = "Play Again?";
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again";
            }
        });
    }
}

function reset() {
    colors = randomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        // assign color
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
}

resetButton.addEventListener("click", function() {
    reset();
})

// colorDisplay.textContent = pickedColor;

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
}
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function randomColors(num) {
    var array = []
    for(var i = 0; i < num; i++) {
        array[i] = generateColor();
    }
    return array;
}

function generateColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}



// easyButton.addEventListener("click", function(){
//     hardButton.classList.remove("selected");
//     easyButton.classList.add("selected");
//     numSquares = 3;
//     colors = randomColors(numSquares);
//     pickedColor = pickColor()
//     colorDisplay.textContent = pickedColor;
//     for (var i = 0; i < squares.length; i++) {
//         // assign color
//         if(colors[i]){
//             squares[i].style.backgroundColor = colors[i];
//         } else {
//             squares[i].style.display = "none";
//         }
//     }
// })

// hardButton.addEventListener("click", function(){
//     easyButton.classList.remove("selected");
//     hardButton.classList.add("selected");
//     numSquares = 6;
//     colors = randomColors(numSquares);
//     pickedColor = pickColor()
//     colorDisplay.textContent = pickedColor;
//     for (var i = 0; i < squares.length; i++) {
//         // assign color
//             squares[i].style.backgroundColor = colors[i];
//             squares[i].style.display = "block";
//         }
// })
