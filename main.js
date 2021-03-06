var canvas = document.getElementById("canvas1");

var ctx = canvas.getContext("2d");

var button1 = document.getElementById("button1");

button1.onclick = () => {
  startGame();
};

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

const gradient = ctx.createLinearGradient(0, 10, 0, 50);
gradient.addColorStop("0.5", "#fff");

const background = new Image();
background.src = "image/BG4.png";

const background1 = new Image();
background1.src = "image/BG3.png";

let BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function resetGame() {
  spacePressed = false;
  angle = 0;
  hue = 0;
  frame = 0;
  score = 0;
  gamespeed = 2;

  const gradient = ctx.createLinearGradient(0, 10, 0, 50);
  gradient.addColorStop("0.5", "#fff");

  const background = new Image();
  background.src = "image/BG4.png";

  const background1 = new Image();
  background1.src = "image/BG3.png";

  BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height,
  };
}

canvas.width = 600;
canvas.height = 400;

function handleBackground() {
  if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
  else BG.x1 -= 0.7;
  if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
  else BG.x2 -= 0.7;
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
  ctx.drawImage(background1, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background1, BG.x2, BG.y, BG.width, BG.height);
}

function startGame() {
  resetGame();
  bird.reset();
  resetObstacles();
  button1.style.display = "none";
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  playMusic();

  handleObstacles();
  bird.update();
  bird.draw();

  ctx.fillStyle = gradient;
  ctx.font = "70px Georgia";

  ctx.strokeText(score, 500, 70);
  ctx.fillText(score, 500, 70);

  handleParticles();
  if (didBirdCollide()) {
    showResult();
    resetGame();
    return;
  }
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}

window.addEventListener("keydown", function (e) {
  if (e.code === "Space") spacePressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "Space") spacePressed = false;
  bird.frameX = 0;
});

const bang = new Image();
bang.src = "image/bang.png";

function showResult() {
  ctx.drawImage(bang, bird.x, bird.y, 50, 50);

  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "#B69385";
  ctx.fillRect(35, 35, 530, 330);
  ctx.fillStyle = "#825C4D";
  ctx.fillRect(40, 40, 520, 320);
  ctx.fillStyle = "#E6E6E6";
  ctx.font = "30px Georgia";
  ctx.globalAlpha = 1.0;
  button1.style.display = "inline";

  if (score < 5) {
    ctx.fillText(
      "Score : " + score + " - Ezik Seviyesi",
      140,
      canvas.height / 2 - 20
    );
  } else if (score > 5 && score < 11) {
    ctx.fillText(
      "Score : " + score + " - Tekrar Dene",
      140,
      canvas.height / 2 - 20
    );
  } else if (score > 10 && score < 21) {
    ctx.fillText(
      "Score : " + score + " - Fena Degil",
      140,
      canvas.height / 2 - 20
    );
  } else if (score > 20 && score < 31) {
    ctx.fillText(
      "Score : " + score + " - Cok iyi !",
      160,
      canvas.height / 2 - 20
    );
  } else if (score > 30 && score < 41) {
    ctx.fillText(
      "Score : " + score + " - Mukemmel !!!",
      140,
      canvas.height / 2 - 20
    );
  } else if (score > 40 && score < 51) {
    ctx.fillText(
      "Score : " + score + " - Dumani Tuten Ejder",
      140,
      canvas.height / 2 - 20
    );
  } else if (score > 50) {
    ctx.fillText(
      "Score : " + score + " - w EJDER KRALI w",
      140,
      canvas.height / 2 - 20
    );
  }

  ctx.fillStyle = "white";
  ctx.fillText(
    "Tekrar Oynamak icin Start Tusuna bas ",
    50,
    canvas.height - 160
  );
  return true;
}

function didBirdCollide() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      return true;
    }
  }
  return false;
}
