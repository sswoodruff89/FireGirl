import Enemy from "./Enemy";

import GameObject from "../GameObject";
import Projectile from "../Projectiles/Projectile";
import Player from "../../Player";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};

class Pterahawk extends Enemy {
  constructor(options) {
    super(options);
    this.velX = options.velX || 3;
    this.velY = 0;
    this.image = options.image || "./assets/pterahawk.png";
    this.enemy = this.loadImage(this.image);
    this.frameNum = options.frameNum || 8;
    this.frameStartX = options.frameStartX || 0;
    this.frameStartY = options.frameStartY || 0;
    this.frameWidth = options.frameWidth || 242;
    this.frameHeight = options.frameHeight || 231;
    this.projectiles = {};
    this.bounds = options.bounds;
    this.sizeRatio = options.sizeRatio || 1;

    this.points = 6 * options.multiplier;

    this.loadImage = this.loadImage.bind(this);
    this.drawEnemy = this.drawEnemy.bind(this);
    this.shootProj = this.shootProj.bind(this);
    this.callAttack = this.callAttack.bind(this);
    this.callAttack();
  }

  

  drawEnemy(ctx, frameCount) {
    this.setDying();
    if ((this.isHit || this.dying) && frameCount % 3 === 0) return;

    if (this.dir === "left") {
      ctx.drawImage(
        this.enemy,
        (Math.floor(frameCount / 4) % this.frameNum) * this.frameWidth +
          this.frameStartX,
        this.frameStartY,
        this.frameWidth,
        this.frameHeight,
        this.x - this.width * 0.031,
        this.y - this.height * 1.88,
        this.frameWidth * this.sizeRatio,
        this.frameHeight * this.sizeRatio
      );
    } else {
      ctx.scale(-1, 1);
      ctx.drawImage(
        this.enemy,
        (Math.floor(frameCount / 4) % this.frameNum) * this.frameWidth +
          this.frameStartX,
        this.frameStartY,
        this.frameWidth,
        this.frameHeight,
        -this.x - this.width - this.width * 0.031,
        this.y - (this.height * 1.88),
        this.frameWidth * this.sizeRatio,
        this.frameHeight * this.sizeRatio
      );
      ctx.scale(-1, 1);
    }
  }

  shootProj() {
    if (Object.keys(this.projectiles).length === 3) return;

    let key;
    for (let i = 1; i <= 3; i++) {
      if (!this.projectiles[i]) {
        key = i;
        break;
      }
    }

    if (this.dir === "left") {
      this.projectiles[key] = new Projectile(
        Projectile.pteraBall(
          [
            this.leftSide() + this.width * 0.15,
            this.bottomSide() - this.height * .4
          ],
          -11,
          9,
          "left"
        )
      );
    } else {
      this.projectiles[key] = new Projectile(
        Projectile.pteraBall(
          [
            this.rightSide() - this.width * 0.2,
            this.bottomSide() - this.height * .5
          ],
         11,
          9,
          "right"
        )
      );
    }
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
  callAttack() {
    this.attackInterval = setInterval(() => {
      this.shootProj();
    }, 1000);
  }

  move(canvas) {
    this.oldX = this.x;
    this.x += this.velX;

    if (this.bounds) {
      if (
        this.x + this.width / 2 < this.bounds[0] ||
        this.x + this.width / 2 > this.bounds[1]
      ) {
        this.velX *= -1;
        this.dir = this.dir === "right" ? "left" : "right";
      }
    } else {
      if (
        this.x + this.width / 2 < 0 ||
        this.x + this.width / 2 > canvas.width
      ) {
        this.velX *= -1;
        this.dir = this.dir === "right" ? "left" : "right";
      }
    }
  }

  //////

  static pter1(pos, bounds, dir = "right", velY, multiplier = 1) {
    return {
      name: "Pterahawk",
      image: "./assets/pterahawk.png",
      frameNum: 8,
      pos: pos,
      width: 220,
      height: 58,
      health: 160,
      velX: dir === "left" ? -3 : 3,
      velY: velY || 0,
      dir: dir,
      damage: 20,
      bounds: bounds,
      multiplier: multiplier
    };
  }

  static pter2(pos, bounds, dir = "right", velY, multiplier = 1) {
    return {
      name: "Pterahawk",
      image: "./assets/pterahawk.png",
      frameNum: 8,
      pos: pos,
      width: 154,
      height: 40.6,
      health: 100,
      velX: dir === "left" ? -4 : 4,
      velY: velY || 0,
      dir: dir,
      damage: 20,
      sizeRatio: .7,
      bounds: bounds,
      multiplier: multiplier
    };
  }

  static pter4(pos, bounds, dir = "right", velY, multiplier = 1) {
    return {
      name: "Pterahawk",
      image: "./assets/pterahawk.png",
      frameNum: 8,
      pos: pos,
      width: 110,
      height: 29,
      health: 70,
      velX: dir === "left" ? -5 : 5,
      velY: velY || 0,
      dir: dir,
      damage: 20,
      sizeRatio: .5,
      bounds: bounds,
      multiplier: multiplier
    };
  }

  static hel2(pos, bounds, dir = "right", multiplier = 0.5) {
    return {
      name: "Pterahawk",
      image: "./assets/pterahawk.png",
      frameNum: 3,
      pos: pos,
      width: 150,
      height: 85,
      health: 100,
      velX: dir === "left" ? -3 : 3,
      dir: dir,
      damage: 10,
      bounds: bounds,
      multiplier: multiplier
    };
  }
}

export default Pterahawk;
