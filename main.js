const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

const gradient = ctx.createLinearGradient(0, 10, 0, 50);
gradient.addColorStop('0.5', '#fff');




const background = new Image();
background.src = 'image/BG4.png';

const background1 = new Image();
background1.src = 'image/BG3.png';


const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height,

}

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





function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    handleBackground();
    playMusic();

    handleObstacles();
    bird.update();
    bird.draw();
    ctx.fillStyle = gradient;
    ctx.font = '70px Georgia';

    ctx.strokeText(score, 500, 70);
    ctx.fillText(score, 500, 70);


    handleParticles();
    handleCollision();
    if (handleCollision()) return;

    requestAnimationFrame(animate);
    angle += 0.12;
    hue++;
    frame++;

}
animate();

window.addEventListener('keydown', function(e) {

    if (e.code === 'Space') spacePressed = true;

});

window.addEventListener('keyup', function(e) {

    if (e.code === 'Space') spacePressed = false;
    bird.frameX = 0;
});

const bang = new Image();
bang.src = 'image/bang.png';

function handleCollision() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
                (bird.y > canvas.height - obstaclesArray[i].bottom &&
                    bird.y + bird.height < canvas.height))) {

            //collision detected
            ctx.drawImage(bang, bird.x, bird.y, 50, 50);
            ctx.font = "30px Georgia";
            ctx.fillStyle = "white";
            if (score < 5) {

                ctx.fillText("Scor : " + score + " - Ezik Seviyesi", 140, canvas.height / 2 - 20);
            } else if (score > 5 && score < 11) {

                ctx.fillText("Scor : " + score + " - Tekrar Dene", 140, canvas.height / 2 - 20);

            } else if (score > 10 && score < 21) {

                ctx.fillText("Scor : " + score + " - Fena Degil", 140, canvas.height / 2 - 20);

            } else if (score > 20 && score < 31) {

                ctx.fillText("Scor : " + score + " - Cok iyi !", 160, canvas.height / 2 - 20);
            } else if (score > 30 && score < 41) {

                ctx.fillText("Scor : " + score + " - Mukemmel !!!", 140, canvas.height / 2 - 20);
            } else if (score > 40 && score < 51) {

                ctx.fillText("Scor : " + score + " - Dumani Tuten Ejder", 140, canvas.height / 2 - 20);
            } else if (score > 50) {

                ctx.fillText("Scor : " + score + " - w EJDER KRALI w", 140, canvas.height / 2 - 20);
            }


            ctx.fillStyle = "white";
            ctx.fillText("Tekrar Oynamak icin F5'e Bas", 100, canvas.height - 160);
            return true;


        }

    }

}