let inputText;
let letter;
var guessText = "";
let guesses = 0;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function checkText(inputText) {
    for (let i = 0; i < inputText.length; ++i) {
        if (inputText[i] == " ") {
            ++i;
        }
        if (!inputText[i].match(/[a-z]/i)) {
            return false;
        }
    }
    return true;
}

function addText() {
    inputText = document.getElementById("inputText").value;
    inputText = inputText.toUpperCase();
    if (inputText != "" && checkText(inputText) == true) {
        let btn = document.createElement("button");
        btn.id = "startButton";
        btn.innerHTML = "Let`s start the game!";
        btn.className = "startButton";
        document.body.appendChild(btn);
        var input = document.getElementById("inputText");
        var addBtn = document.getElementById("addText");
        var intoText = document.getElementById("intoText");
        input.parentNode.removeChild(input);
        addBtn.parentNode.removeChild(addBtn);
        intoText.parentNode.removeChild(intoText);
        startButton.onclick = addGuessingButtons;
    } else {
        alert("Please enter a valid text!");
    }
}

function addGuessingButtons() {
    for (let i = 0; i < inputText.length; ++i) {
        if (inputText[i] == " ") {
            guessText += " ";
        } else {
            guessText += "?";
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
            letter = this.id;
            HangManGame();
        }
    }
    document.getElementById("result").innerHTML = guessText + "/ " + inputText.length + " letters";
    document.getElementById("result").innerHTML += "/  " + guesses + " out of 5 guesses";
}

function HangManGame() {
    let newText = "";
    document.getElementById(letter).disabled = true;
    for (let i = 0; i < inputText.length; ++i) {
        if (letter == inputText[i] && guessText[i] == "?") {
            newText += inputText[i];
            document.getElementById(letter).style.backgroundColor = "lightgreen";
        } else if (guessText != "?") {
            newText += guessText[i];
        } else {
            newText += "?";
        }
    }
    if (guessText == newText) {
        ++guesses;
    }
    document.getElementById("result").innerHTML = newText + " / " + inputText.length + " letters";
    document.getElementById("result").innerHTML += "/ " + guesses + " out of 5 guesses";
    guessText = newText;
    if (guesses == 5 || inputText == guessText) {
        for (let i = 0; i < 26; ++i) {
            document.getElementById(alphabet[i]).disabled = true;
        }
        if (guesses == 5) {
            document.getElementById("result").innerHTML = "- " + inputText + " - " + "GAME OVER!";
            document.getElementById("result").style.color = "red";
        } else {
            document.getElementById("result").innerHTML = "- " + inputText + " - " + "WINNER";
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

