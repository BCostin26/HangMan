let inputWord;
let alphabetWord;
var guessWord = "";
let mistakes = 0;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function checkText(inputWord) {
    for (let i = 0; i < inputWord.length; ++i) {
        if (!inputWord[i].match(/[a-z]/i)) {
            return false;
        }
    }
    return true;
}

function preStart() {
    inputWord = document.getElementById("inputWord").value;
    inputWord = inputWord.toUpperCase();
    if (inputWord != "" && checkText(inputWord) == true) {
        let btn = document.createElement("button");
        btn.id = "startButton";
        btn.innerHTML = "Let`s start the game!";
        btn.className = "startButton";
        document.body.appendChild(btn);
        var input = document.getElementById("inputWord");
        var addBtn = document.getElementById("addWord");
        var intoText = document.getElementById("intoText");
        input.parentNode.removeChild(input);
        addBtn.parentNode.removeChild(addBtn);
        intoText.parentNode.removeChild(intoText);
        startButton.onclick = startGame;
    } else {
        alert("Please enter a valid text!");
    }
}

function startGame() {
    for (let i = 0; i < inputWord.length; ++i) {
        if (inputWord[i] == " ") {
            guessWord += " ";
        } else {
            guessWord += "?";
        }
    }
    var startButton = document.getElementById("startButton");
    startButton.parentNode.removeChild(startButton);
    for (let i = 0; i < 26; ++i) {
        let btn = document.createElement("button");
        btn.id = alphabet[i];
        btn.value = alphabet;
        btn.innerHTML = alphabet[i];
        btn.className = "alphabet";
        document.body.appendChild(btn);
        btn.onclick = function () {
            alphabetWord = this.id;
            HangMan();
        }
    }
    document.getElementById("result").innerHTML = guessWord + "/ " + inputWord.length + " letters";
    document.getElementById("result").innerHTML += "/  " + mistakes + " out of 5 guesses";
}

function HangMan() {
    let newWord = "";
    document.getElementById(alphabetWord).disabled = true;
    for (let i = 0; i < inputWord.length; ++i) {
        if (alphabetWord == inputWord[i] && guessWord[i] == "?") {
            newWord += inputWord[i];
            document.getElementById(alphabetWord).style.backgroundColor = "lightgreen";
        } else if (guessWord != "?") {
            newWord += guessWord[i];
        } else {
            newWord += "?";
        }
    }
    if (guessWord == newWord) {
        ++mistakes;
    }
    document.getElementById("result").innerHTML = newWord + " / " + inputWord.length + " letters";
    document.getElementById("result").innerHTML += "/ " + mistakes + " out of 5 guesses";
    guessWord = newWord;
    if (mistakes == 5 || inputWord == guessWord) {
        for (let i = 0; i < 26; ++i) {
            document.getElementById(alphabet[i]).disabled = true;
        }
        if (mistakes == 5) {
            document.getElementById("result").innerHTML = "- " + inputWord + " - " + "GAME OVER!";
            document.getElementById("result").style.color = "red";
        } else {
            document.getElementById("result").innerHTML = "- " + inputWord + " - " + "WINNER";
            document.getElementById("result").style.color = "green";
        }
        let btn = document.createElement("button");
        btn.id = "resetBtn";
        btn.className = "resetBtn";
        btn.innerHTML = "Restart";
        document.getElementById("reset").appendChild(btn);
    }
    resetBtn.onclick = function () {
        window.location.reload();
    }
}

