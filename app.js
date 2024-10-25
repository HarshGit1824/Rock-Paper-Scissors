let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');

const roundHistoryElem = document.getElementById('round-history');

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerHTML = "Game Was Draw. Play Again.";
    msg.style.backgroundColor = "#081b31";
    clickSound.play(); // Play click sound for draw
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        winSound.play(); // Play win sound
        userScorePara.style.color = 'green';
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lose! ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "red";
        loseSound.play(); // Play lose sound
        compScorePara.style.color = 'red';
    }

    addToHistory(userChoice, compChoice, userWin); // Add to round history

    // Reset colors
    setTimeout(() => {
        userScorePara.style.color = '';
        compScorePara.style.color = '';
    }, 1000);
};

const playGame = (userChoice) => {
    // clickSound.play();  // Play click sound
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

const addToHistory = (userChoice, compChoice, userWin) => {
    const result = userWin ? 'Win' : 'Lose';
    const listItem = document.createElement('li');
    listItem.textContent = `You chose ${userChoice}, computer chose ${compChoice}: You ${result}`;
    roundHistoryElem.appendChild(listItem);
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
