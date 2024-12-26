const colors = ["green", "red", "yellow", "blue"];
let gameOrder = [];
let userOrder = [];
let level = 0;
let score = 0;
// const scoreArray=[7,5,10,3]

const startAudio = new Audio("audio/game-start.mp3");
const btnClick = new Audio("audio/btn.mp3");
const gameOver = new Audio("audio/game-over.mp3");

document.getElementById("start").addEventListener("click", startGame);

function startGame() {
  startAudio.play();
  resetGame();
  document.getElementById("start").disabled = true;
  nextGameOrder();
}

function resetGame() {
  gameOrder = [];
  userOrder = [];
  level = 0;
  score = 0;
  document.getElementById("status").classList.remove("gameOverClass");
  document.getElementById("score").innerText = score;
  document.getElementById("status").innerText = "Level: " + level;
}

function addButtonListeners() {
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });
}

function removeButtonListeners() {
  document.querySelectorAll(".btn").forEach((button) => {
    button.removeEventListener("click", handleButtonClick);
  });
}

function handleButtonClick(e) {
  const userColor = e.target.id;
  btnClick.play();
  userOrder.push(userColor);
  flashButton(userColor);
  checkGameOrder(userOrder.length - 1);
}

function nextGameOrder() {
  userOrder = [];
  removeButtonListeners();
  level++;
  document.getElementById("status").innerText = "Level: " + level;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameOrder.push(randomColor);
  playGameOrder();
}

function playGameOrder() {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= gameOrder.length) {
      clearInterval(interval);
      addButtonListeners();
      return;
    }
    flashButton(gameOrder[i]);
    i++;
  }, 1000);
}

function flashButton(color) {
  const button = document.getElementById(color);
  button.style.opacity = 1;
  setTimeout(() => {
    button.style.opacity = 0.7;
  }, 500);
}

function checkGameOrder(index) {
  if (userOrder[index] !== gameOrder[index]) {
    gameOver.play();
    document.getElementById("status").innerText = "Game Over!";
    document.getElementById("status").classList.add("gameOverClass");
    document.getElementById("score").innerText = score;
    document.getElementById("start").disabled = false;
    removeButtonListeners();
    return;
  }

  if (userOrder.length === gameOrder.length) {
    score++;
    document.getElementById("score").innerText = score;
    setTimeout(nextGameOrder, 1000);
  }
}
