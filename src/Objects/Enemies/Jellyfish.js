import Enemy from "./Enemy";

import GameObject from "../GameObject";
import ElectricBall from "../Projectiles/ElectricBall";
import Player from "../../Player";

const CONSTANTS = {
    GRAVITY: 0.8,
    FRICTION: 2.5,
    MAX_VEL: 50
};

class Jellyfish extends Enemy {
    constructor(options) {
        super(options);
        this.player = options.player;
        this.velX = options.velX || 0;
        this.velY = 0;
        this.image = options.image || "./assets/jellyfish.png";
        this.enemy = this.loadImage(this.image);
        this.frameNum = options.frameNum || 8;
        this.frameStartX = 4;
        this.frameStartY = 130;
        this.frameWidth = options.frameWidth || 58;
        this.frameHeight = options.frameHeight || 64;
        this.active = true;
        this.opening = false;
        this.projectiles = {};
        this.playerCheckTimeout = "";
        this.damage = options.damage;

        this.points = 10 * options.multiplier;

        this.drawEnemy = this.drawEnemy.bind(this);
        this.shootProj = this.shootProj.bind(this);
        // this.setPlayerCheckInterval = this.setPlayerCheckInterval.bind();
        this.checkPlayerPos = this.checkPlayerPos.bind(this);
        this.setAttackInterval = this.setAttackInterval.bind(this);

        this.setAttackInterval();
    }

    setAttackInterval() {
        setTimeout(() => {
            this.attackInterval = setInterval(() => {
                this.shootProj();
            }, 4000)
        }, 2000)
    }

    checkPlayerPos(x, y, homing) {
        if (y > this.y) {
            this.velY = 2;
        } else {
            this.velY = -2;
        }

        // if ((y > this.y && y < this.y + this.height) && (x > this.x || x < this.x)) {
        //     this.velX = (this.dir === "left") ? -5 : 5;
        // } else {
        //     this.velX = (this.dir === "left") ? -2 : 2;
        // }

        if (x > this.x && this.dir === "left") {
            // clearTimeout(this.playerCheckTimeout);
            this.playerCheckTimeout = setTimeout(() => {
                this.velX = 2;
                this.dir = "right";
            }, 1000);
        } else if (x < this.x && this.dir === "right") {
            // clearTimeout(this.playerCheckTimeout);
            this.playerCheckTimeout = setTimeout(() => {
                this.velX = -2;
                this.dir = "left";

            }, 1000);

        } else if ((x > this.x && this.dir === "right") || (x < this.x && this.dir === "left")) {
            clearTimeout(this.playerCheckTimeout);
        }
    }

    setPlayerCheckInterval(player) {
        // debugger
        this.playerCheckInterval = setInterval(() => {
            this.checkPlayerPos(player);
        }, 2000);
    }

    drawEnemy(ctx, frameCount) {
        this.setDying();
        if ((this.isHit || this.dying) && frameCount % 3 === 0) return;

        let count = Math.floor(frameCount / 2.5) % this.frameNum;
        if (this.dir === "left") {

            ctx.drawImage(
                this.enemy,
                (count) * this.frameWidth + (this.frameStartX * count + (count * 2)),
                this.frameStartY,
                this.frameWidth,
                this.frameHeight,
                this.x, this.y,
                this.width, this.height
            );
        } else {
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.enemy,
                (count) * this.frameWidth + (this.frameStartX * count + (count * 2)),
                this.frameStartY,
                this.frameWidth,
                this.frameHeight,
                -this.x - this.width, this.y,
                this.width, this.height
            );
            ctx.scale(-1, 1);

        }
    }

    shootProj() {
        if (Object.keys(this.projectiles).length === 10) return;

        let key;
        for (let i = 1; i <= 10; i++) {
            if (!this.projectiles[i]) {
                key = i;
                break;
            }
        }
        this.projectiles[key] = new ElectricBall({
                pos: [this.leftSide() + (this.width / 2),
                this.bottomSide() - (this.height / 2)]
            });
    }

    setDying() {
        if (this.health <= 0) {
            this.dying = true;
            this.damage = 0;
            this.velX = 0;
            this.velY = 0;
            clearInterval(this.attackInterval);
            setTimeout(() => {
                this.dead = true;
            }, 300);
        }
    }

    ////////CPU

    move(canvas, player) {
        this.oldY = this.y;
        this.oldX = this.x;
        this.x += this.velX;
        this.y += this.velY;
        this.checkPlayerPos(player.x, player.y - (player.height * 2));

        // if ((this.x + (this.width / 2)) < 0 || this.x + (this.width / 2) > canvas.width) {
        //   this.velX *= -1;
        //   this.dir = (this.dir === "right") ? "left" : "right";
        // }
    }

    //////



    static jell1(pos, player, dir = "right", damage = 20) {

        return {
            name: "Jellyfish",
            image: "./assets/jellyfish.png",
            frameNum: 8,
            pos: pos,
            width: 90,
            height: 100,
            health: 130,
            velX: 1,
            dir: dir,
            player: player,
            multiplier: 1

        };
    }
    static jell2(pos, player, dir = "right", damage = 15) {

        return {
            name: "Jellyfish",
            image: "./assets/jellyfish.png",
            frameNum: 8,
            pos: pos,
            width: 60,
            height: 66,
            health: 90,
            velX: 1,
            dir: dir,
            player: player,
            multiplier: .5
        };
    }
    static jell3(pos, player, dir = "right", damage = 10) {

        return {
            name: "Jellyfish",
            image: "./assets/jellyfish.png",
            frameNum: 8,
            pos: pos,
            width: 35,
            height: 45,
            health: 50,
            velX: 1,
            dir: dir,
            player: player,
            multiplier: .5

        };
    }


}

export default Jellyfish;
