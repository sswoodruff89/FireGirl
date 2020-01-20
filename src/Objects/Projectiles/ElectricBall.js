import GameObject from "../GameObject";
import Collision from "../../util/Collision";
import Sound from "../../util/Sound";
import Projectile from "./Projectile";

const CONSTANTS = {
    GRAVITY: 0.8,
    FRICTION: 2.5,
    MAX_VEL: 50
};


class ElectricBall extends Projectile {
    constructor(options) {
        super(options);
        this.proj = this.loadImage();
        this.width = 90;
        this.height = 72.5;
        this.velX = 0;
        this.velY = 1;
        this.oldX = this.x;
        this.oldY = this.y;
        this.damage = options.damage;
        this.impacted = false;
        this.impactTimeout = 6000;
        this.impactSrc = "./assets/electric_ball.png";


        this.frameStartX = 0;
        this.frameStartY = 435;
        this.frameWidth = 180;
        this.frameHeight = 145;
        this.frameNum = 4;

        this.impactWidth = 180;
        this.impactHeight = 145;
        this.impactStartX = 145;
        this.impactStartY =  150;

        this.hitTimeout = 6000;

        this.tileSize = 60;

        this.collider = new Collision();
        this.isHit = false;

        // this.impactSound = new Sound({ src: this.mapKeys[this.screen].theme });


        this.loadImage = this.loadImage.bind(this);
        this.getTopLeftPos = this.getTopLeftPos.bind(this);
        this.getTopRightPos = this.getTopRightPos.bind(this);
        this.getBottomLeftPos = this.getBottomLeftPos.bind(this);
        this.getBottomRightPos = this.getBottomRightPos.bind(this);
        this.setHit = this.setHit.bind(this);
        this.timeOutHit = this.timeOutHit.bind(this);
        this.updateProjectile = this.updateProjectile.bind(this);
        this.drawProjectile = this.drawProjectile.bind(this);
        this.drawImpact = this.drawImpact.bind(this);
        this.hitBox = this.hitBox.bind(this);

        this.impactSound = new Sound(Sound.shock());

        this.timeOutHit();
    }

    hitBox() {
        return {
            left: this.x + (this.width / 5),
            right: this.x + (this.width * .8),
            top: this.y + (this.height / 5),
            bottom: this.y + (this.height * .8)
        }
    }

    loadImage() {
        let proj = new Image();
        proj.src = "./assets/electric_ball.png";
        return proj;
    }

    getTopLeftPos() {
        let x = Math.floor((this.leftSide() + this.width / 5) / this.tileSize);
        let y = Math.floor((this.topSide() + this.height / 5) / this.tileSize);
        return [x, y];
    }

    getTopRightPos() {
        let x = Math.floor((this.rightSide() - this.width / 5) / this.tileSize);
        let y = Math.floor((this.topSide() + this.height / 5) / this.tileSize);
        return [x, y];
    }
    getBottomLeftPos() {
        let x = Math.floor((this.leftSide() + this.width / 5) / this.tileSize);
        let y = Math.floor((this.bottomSide() - this.height / 5) / this.tileSize);
        return [x, y];
    }
    getBottomRightPos() {
        let x = Math.floor(this.rightSide() / this.tileSize);
        let y = Math.floor((this.bottomSide() - this.height / 5) / this.tileSize);
        return [x, y];
    }

    setHit() {

        // setTimeout(() => {
            this.impacted = true;
            this.impactSound.play();
            this.proj.src = this.impactSrc;
            this.width *= 1.7;
            this.height *= 1.7;
            this.velX = 0;
            this.velY = 0;

            setTimeout(() => {
                this.impactSound.pause();
                this.isHit = true;
            }, 3000)


        // }, 6000)
    }

    timeOutHit() {
        this.hitTimeout = setTimeout(() => {
            this.setHit()
        }, 7000);
    }


    platformCheck() {
        let colVal;
        let top;
        let bottom;
        let right;
        let left;
        let cols = 15;

        if (this.dir === "left") {
            [left, top] = this.getTopLeftPos();
            colVal = this.physicalMap[top * cols + left];
            this.collider.collidePlatform(
                this,
                left * this.tileSize,
                top * this.tileSize,
                colVal
            );

            [left, bottom] = this.getBottomLeftPos();
            colVal = this.physicalMap[bottom * cols + left];
            this.collider.collidePlatform(
                this,
                left * this.tileSize,
                bottom * this.tileSize,
                colVal
            );
        }

        if (this.dir === "right") {
            [right, top] = this.getTopRightPos();
            colVal = this.physicalMap[top * cols + right];
            this.collider.collidePlatform(
                this.player,
                right * this.tileSize,
                top * this.tileSize,
                colVal
            );

            [right, bottom] = this.getBottomRightPos();
            colVal = this.physicalMap[bottom * cols + right];

            this.collider.collidePlatform(
                this.player,
                right * this.tileSize,
                bottom * this.tileSize,
                colVal
            );

        }

    }

    updateProjectile() {
        this.oldX = this.x;
        this.oldY = this.y;

        this.x += this.velX;
        this.y += this.velY;
    }

    drawProjectile(ctx, frameCount) {
        if (this.isHit) return;

        if (this.impacted) {
            this.drawImpact(ctx, frameCount);
            return;
        }
        this.updateProjectile();

        ctx.drawImage(
            this.proj,
            (frameCount % this.frameNum) * this.frameWidth,
            // (0) * this.frameWidth,
            // (frameCount % this.frameNum) * this.frameWidth + (((frameCount % this.frameNum) + 1) * 21),
            this.frameStartY,
            this.frameWidth,
            this.frameHeight,
            this.x, this.y,
            this.width, this.height
        );


    }

    drawImpact(ctx, frameCount) {
        ctx.drawImage(
            this.proj,
            (frameCount % this.frameNum) * this.frameWidth,
            this.frameStartY,
            180,
            145,
            this.x - (180 / 4), this.y - (145 / 4),
            180, 145
        );

    }


    static electricBall(pos, velX = 0, velY = 1, dir = "right") {
        return {
            pos: pos,
            width: 78.5,
            height: 86,
            velX: velX,
            velY: velY,
            dir: "up",
            frameStartX: 0,
            frameStartY: 435,
            frameWidth: 180,
            frameHeight: 145,
            frameNum: 4,
            image: "./assets/electric_ball.png",
            impact: "./assets/electric_ball.png",
            impactTimeout: 6000,
            impactWidth: 180,
            impactHeight: 145,
            impactFrameWidth: 180,
            impactFrameHeight: 145,
            hitTimeout: 6000,
            damage: 20
        };
    }
}

export default ElectricBall;

// const fireball = {
//   name: "fireball"
// }


// };