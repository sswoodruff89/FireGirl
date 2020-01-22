import Enemy from "./Enemy";

import GameObject from "../GameObject";
import Projectile from "../Projectiles/Projectile";
import Player from "../../Player";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};

class Helicopter extends Enemy {
  constructor(options) {
    super(options);
    this.velX = options.velX || 3;
    this.velY = 0;
    this.image = options.image || "./assets/footEn.png";
    this.enemy = this.loadImage(this.image);
    this.frameNum = options.frameNum || 3;
    this.frameStartX = options.frameStartX || 68;
    this.frameStartY = options.frameStartY || 290;
    this.frameWidth = options.frameWidth || 116;
    this.frameHeight = options.frameHeight || 80;
    this.projectiles = {};
    this.bounds = options.bounds;

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
        (frameCount % this.frameNum) * this.frameWidth + this.frameStartX,
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
        (frameCount % this.frameNum) * this.frameWidth + this.frameStartX,
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
        Projectile.helibullet(
          [this.leftSide() + (this.width * 0.15),
            this.bottomSide() - (this.height * 0.184)],
          -9, 7, "left")
      );
    } else {
      this.projectiles[key] = new Projectile(
        Projectile.helibullet(
          [this.rightSide() - (this.width * 0.2),
            this.bottomSide() - (this.height * 0.184)],
          9, 7, "right")
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

    }, 500);
  }

  move(canvas) {
    this.oldX = this.x;
    this.x += this.velX;

    if (this.bounds) {
      if ((this.x + (this.width / 2)) < this.bounds[0] || this.x + (this.width / 2) > this.bounds[1]) {
        this.velX *= -1;
        this.dir = (this.dir === "right") ? "left" : "right";
      }
    } else {
      if ((this.x + (this.width / 2)) < 0 || this.x + (this.width / 2) > canvas.width) {
        this.velX *= -1;
        this.dir = (this.dir === "right") ? "left" : "right";
      }

    }

  }

  //////



  static hel1(pos, bounds, dir = "right", velY, multiplier = 1) {
    return {
      name: "helicopter",
      image: "./assets/footEn.png",
      frameNum: 3,
      pos: pos,
      width: 200,
      height: 125,
      health: 100,
      velX: (dir === "left") ? -3 : 3,
      velY: velY || 0,
      dir: dir,
      damage: 20,
      bounds: bounds,
      multiplier: multiplier
    };
  }
  
  static hel2(pos, bounds, dir = "right", multiplier = .5) {
    return {
      name: "helicopter",
      image: "./assets/footEn.png",
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

export default Helicopter;
