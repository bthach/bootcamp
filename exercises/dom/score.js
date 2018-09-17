var player1 = document.getElementById("one");
var score1 = 0;
var p1 = document.getElementById("p1");
var player2 = document.querySelector("#two");
var score2 = 0;
var p2 = document.getElementById("p2");
var rst = document.querySelector("#rst");
var number = document.querySelector("input[type='number']");
var p = document.querySelector("p span");

var gameOver = false;

var winningScore = 5;

player1.addEventListener("click", function() {
    if (!gameOver) {
        score1++;
        if (score1 === winningScore) {
            p1.classList.add("winner");
            gameOver = true;
        }
        p1.textContent = score1;
    }
});

player2.addEventListener("click", function() {
    if (!gameOver) {
        score2++;
        if (score2 === winningScore) {
            p2.classList.add("winner");
            gameOver = true;
        }
        p2.textContent = score2;
    }
});

// rst.addEventListener("click", function() {
//     alert("Click");
// });

rst.addEventListener("click", function() {
    reset();
});

function reset() {
    score1 = 0;
    score2 = 0;
    p1.textContent = 0;
    p2.textContent = 0;
    p1.classList.remove("winner");
    p2.classList.remove("winner");
    gameOver = false;
}

number.addEventListener("change", function() {
    p.textContent = number.value;
    winningScore = Number(number.value);
    reset();
})