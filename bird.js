const dragonSprite = new Image();
dragonSprite.src = 'image/dragon.png';

class Bird {
    constructor() {
        this.reset()
    }
    reset() {
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.originalWidth = 113;
        this.originalHeight = 91;
        this.width = this.originalWidth / 2;
        this.height = this.originalHeight / 2;
        this.weight = 1;
        this.frameX = 0;
    }
    update() {

        let curve = Math.sin(angle) * 20;

        if (this.y > canvas.height - (this.height * 1.5) + curve) {
            this.y = canvas.height - (this.height * 1.5) + curve;
            this.vy = 0
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }

        if (this.y < 0 ) {
            this.y = 0;
            this.vy = 0;




        }
        if (spacePressed && this.y > 0) this.flap();
    }

    draw() {

        ctx.drawImage(dragonSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight,
            this.x - 30, this.y - 12, this.width * 1.7, this.height * 1.7);
    }

    flap() {

        this.vy -= 2;
        if (this.frameX >= 3) this.frameX = 0;
        else if (frame % 3 === 0) this.frameX++;


    }

}

const bird = new Bird();
