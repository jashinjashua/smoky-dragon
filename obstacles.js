const obstaclesArray = [];

const pipeb = new Image();
pipeb.src = "image/pipeb.png";

const pipet = new Image();
pipet.src = "image/pipet.png";




class Obstacle {
    constructor() {
        this.top = (Math.random() * canvas.height / 2.5) + 25;
        this.bottom = (Math.random() * canvas.height / 2.5) + 25;
        this.x = canvas.width;
        this.width = 50;
        this.counted = false;
    }

    draw() {


        ctx.drawImage(pipet, this.x, 0, this.width, this.top);
        ctx.drawImage(pipeb, this.x, canvas.height - this.bottom, this.width, this.bottom);



    }
    update() {
        this.x -= gamespeed;
        if (!this.counted && this.x < bird.x) {
            score++;
            this.counted = true;
        }

        this.draw();

    }

}

function handleObstacles() {
    if (frame % 75 === 0) {
        obstaclesArray.unshift(new Obstacle);
    }
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
    }

    if (obstaclesArray > 20) {
        obstaclesArray.pop(obstaclesArray[0]);

    }

}