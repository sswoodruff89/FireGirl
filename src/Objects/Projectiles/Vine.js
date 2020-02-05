import Sound from "../../util/Sound";


class Vine {
    constructor(options) {
        this.boss = options.boss || {};
        this.vine = this.loadImage();
        this.attacking = false;
        this.charging = false;
        this.frameNum = 7;
        this.velX = 0;
        this.velY = options.velY;
        this.x = options.pos[0];
        this.y = options.pos[1];
        this.startX = this.x;

        this.redVine = new Image();
        this.redVine.src = "./assets/vine_red.png"

        this.boundsY = options.boundsY;
        this.damage = options.damage || 10;
        this.frameCountOffset = options.frameCountOffset;

        this.attack = this.attack.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.backUp = this.backUp.bind(this);
        this.charge = this.charge.bind(this);
        this.drawVines = this.drawVines.bind(this);
        this.playerCheck = this.playerCheck.bind(this);
        this.move = this.move.bind(this);

        this.impactSound = new Sound(Sound.whoosh());

    }

    loadImage() {
        let vine = new Image();
        vine.src = "./assets/vines.png";
        return vine;
    }

    attack(int) {

        this.attacking = true;
        this.chargeTimeout = setTimeout(() => {
            this.charge();
        }, int);
    }

    backUp() {
        this.vineTimeout = setTimeout(() => {
            this.charging = false;
            this.velX = 10;
        }, 300)
    }

    charge() {
        this.charging = true;
        this.velX = -20;
        this.impactSound.play();

    }


    drawVines(ctx, frameCount) {
        if (this.boss.dying && frameCount % 3 === 0) return;

        let state = (this.charging) ? 0 :
            (this.attacking) ? (frameCount + this.frameCountOffset) % this.frameNum :
                ((Math.floor(frameCount / 2.5) + this.frameCountOffset) % this.frameNum)
        let width = (this.attacking) ? 1000 : 400

        // let sprite = (this.boss.health < 500) ? this.redVine : this.vine;
        // let count = Math.floor(frameCount / 2.5) + this.frameCountOffset % this.frameNum;
        if (this.boss.dir === "left") {
            ctx.drawImage(
                this.vine,
                2,
                state * 94,
                width,
                94,
                this.x, this.y,
                width, 60
            );
        } else {
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.vine,
                2,
                state * 94,
                width,
                94,
                -this.x - width, this.y,
                width, 60
            );
            ctx.scale(-1, 1);

        }
    }

    playerCheck(player) {
        if (this.boss.dying) return;
        if (player.x > this.x &&
            (player.y + player.height > (this.y + 10)) &&
            player.y < (this.y + 50)) {
            player.setHit(this.damage);
        }
    }

    move(ctx, frameCount, player) {
        this.oldX = this.x;
        this.x += this.velX;
        if (!this.attacking) {
            this.y += this.velY;
        }

        this.playerCheck(player);
        if (this.x < -20) {
            this.x = -20;
            // this.attacking = false;
            this.backUp();
        } else if (this.x > this.startX) {
            this.velX = 0;
            this.attacking = false;
            this.x = this.startX;


            // this.attackTimeout = setTimeout(() => {
            //   this.attack();
            // }, 10000);
        }
        if (this.y < this.boundsY[0] || this.y > this.boundsY[1]) {
            this.velY *= -1;
        }
        this.drawVines(ctx, frameCount);
    }

    static vines1(boss, pos) {
        let round = Math.floor(Math.random() * 10);
        return {
            boss: boss,
            pos: pos,
            velY: (round <= 5) ? -1 : 1,
            // boundsY: [0, 580],
            // boundsY: [pos[1] - 75, pos[1] + 75],
            boundsY: [pos[1] - 100, pos[1] + 100],
            frameCountOffset: Math.floor(Math.random() * 7)
        }
    }
    static vines2(boss, pos) {
        let round = Math.floor(Math.random() * 10);
        return {
            boss: boss,
            pos: pos,
            velY: (round <= 5) ? -.3 : .3,
            // boundsY: [0, 580],
            // boundsY: [pos[1] - 75, pos[1] + 75],
            boundsY: [pos[1] - 10, pos[1] + 10],
            frameCountOffset: Math.floor(Math.random() * 7)
        }
    }
}

export default Vine;