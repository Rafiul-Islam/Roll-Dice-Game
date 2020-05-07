/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer;

newGame();

document.querySelector(".btn-roll").addEventListener("click", function () {
  // !set random number
  var dice = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;

  // !display dice
  var diceImage = document.querySelector(".dice");
  var diceImage2 = document.querySelector("#dice-2");
  diceImage.style.display = "block";
  diceImage2.style.display = "block";
  diceImage.src = "dice-" + dice + ".png";
  diceImage2.src = "dice-" + dice2 + ".png";

  // !update the round score IF the rolled number is not 1
  if (dice > 1 && dice2 > 1) {
    if (dice == 6 && dice2 == 6) {
      score[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
    } else {
      roundScore += dice + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    }
  } else {
    // !chage the palyer
    nextPlayer();
  }
  //console.log("Dice : " + dice);
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  // !update the score
  score[activePlayer] += roundScore;
  document.querySelector("#score-" + activePlayer).textContent =
    score[activePlayer];

  // ! set the winner
  if (score[activePlayer] >= 100) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";

    // !style the winner name
    document
      .querySelector("#name-" + activePlayer)
      .classList.add("winner-player-name");

    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");

    activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("active");
    //console.log("activePlayer : " + activePlayer);
    document.querySelector(".btn-roll").disabled = true;
    document.querySelector(".btn-hold").disabled = true;
    //newGame();
  }

  // !change the palyer
  nextPlayer();
});

document.querySelector(".btn-new").addEventListener("click", function () {
  if (activePlayer == 1) {
    document.getElementById("name-1").textContent = "Player 2";
    //console.log("Player 1");
  }

  if (activePlayer == 0) {
    document.getElementById("name-0").textContent = "Player 1";
    //console.log("Player 2");
  }

  document
    .querySelector("#name-" + activePlayer)
    .classList.add("winner-player-name");

  newGame();
});

function nextPlayer() {
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";
}

function newGame() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector(".dice").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector("#name-0").classList.remove("winner-player-name");
  document.querySelector("#name-1").classList.remove("winner-player-name");

  document.querySelector(".btn-roll").style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";

  //console.log("New Game Started");
}
