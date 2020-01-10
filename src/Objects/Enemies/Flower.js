import Enemy from "./Enemy";

import GameObject from "../GameObject";
import Projectile from "../Projectiles/Projectile";
import Player from "../../Player";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};

class Flower extends Enemy {
  constructor(options) {
    super(options);
    this.velX = options.velX || 0;
    this.velY = 0;
    this.image = options.image || "./assets/footEn.png";
    this.enemy = this.loadImage(this.image);
    this.frameNum = options.frameNum || 4;
    this.frameStartX = 10;
    this.frameStartY = 265;
    this.frameWidth = options.frameWidth || 117;
    this.frameHeight = options.frameHeight || 107;
    this.active = true;
    this.opening = false;
    
    this.projectiles = {};

    this.drawEnemy = this.drawEnemy.bind(this);
    this.shootProj = this.shootProj.bind(this);
    this.callAttack = this.callAttack.bind(this);

  }

  isActive() {

  }

  drawEnemy(ctx, frameCount) {
    this.setDying();
    if ((this.isHit || this.dying) && frameCount % 3 === 0) return;

    if (this.active) {
      let count = Math.floor(frameCount / 2.5) % this.frameNum;
      let x = (count > 0) ? 20 : this.frameStartX;


      ctx.drawImage(
        this.enemy,
        // (Math.floor(frameCount / 2) % this.frameNum) * this.frameWidth + this.frameStartX,
        (count % this.frameNum) * this.frameWidth + x,
        // (0) * this.frameWidth + this.frameStartX,
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
          [this.leftSide() + 30,
          this.bottomSide() - 23],
          -9, 7, "left")
      );
    } else {
      this.projectiles[key] = new Projectile(
        Projectile.helibullet(
          [this.rightSide() - 40,
          this.bottomSide() - 23],
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
  // callAttack() {
  //   this.attackInterval = setInterval(() => {

  //     this.shootProj();

  //   }, 500);
  // }

  move(canvas) {
    this.oldX = this.x;
    this.x += this.velX;


    if ((this.x + (this.width / 2)) < 0 || this.x + (this.width / 2) > canvas.width) {
      this.velX *= -1;
      this.dir = (this.dir === "right") ? "left" : "right";
    }
  }

  //////



  static flow1(pos, dir = "right") {
    return {
      name: "helicopter",
      image: "./assets/plant.png",
      frameNum: 3,
      pos: pos,
      width: 54,
      height: 54,
      health: 50,
      velX: 0,
      dir: dir
    };
  }
  static flow2(pos, dir = "right") {
    return {
      name: "helicopter",
      image: "./assets/plant.png",
      frameNum: 3,
      pos: pos,
      width: 84,
      height: 84,
      health: 100,
      velX: 0,
      dir: dir
    };
  }

}

export default Flower;
