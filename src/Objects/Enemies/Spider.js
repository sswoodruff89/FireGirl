import Enemy from "./Enemy";

import GameObject from "../GameObject";
import Projectile from "../Projectiles/Projectile";
import Player from "../../Player";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};

class Spider extends Enemy {
  constructor(options) {
    super(options);
    this.velX = options.velX || 0;
    this.velY = options.velY || 1;
    this.image = options.image;
    this.enemy = this.loadImage(this.image);
    this.frameNum = options.frameNum || 4;
    this.frameStartX = 0;
    this.frameStartY = 0;
    this.frameWidth = options.frameWidth || 92.5;
    this.frameHeight = options.frameHeight || 102;
    this.frameCount = 0;
    this.bounds = options.bounds;
    this.damage = options.damage;

    this.points = 5 * options.multiplier;



    this.projectiles = {};

    this.drawEnemy = this.drawEnemy.bind(this);
    this.shootProj = this.shootProj.bind(this);
    this.callAttack = this.callAttack.bind(this);
    this.startFrameCount = this.startFrameCount.bind(this);


  }

  startFrameCount() {
    this.enemyInterval = setInterval(() => {
      this.frameCount++;
    }, 1000 / 30);
  }

  drawEnemy(ctx, frameCount = this.frameCount) {
    this.setDying();

    ctx.beginPath();
    ctx.moveTo(this.getMidX(this.pos[0]), this.pos[1]);
    ctx.lineTo(this.getMidX(this.pos[0]), this.getMidY(this.y));
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.stroke();
    ctx.closePath();

    if ((this.isHit || this.dying) && frameCount % 3 === 0) return;

      let count = Math.floor(frameCount / 2.5) % this.frameNum;
      // let x = (count > 0) ? 20 : this.frameStartX;


      ctx.scale(1, -1);

      ctx.drawImage(
        this.enemy,
        // (Math.floor(frameCount / 2) % this.frameNum) * this.frameWidth + this.frameStartX,
        (count % this.frameNum) * this.frameWidth,
        // (0) * this.frameWidth + this.frameStartX,
        this.frameStartY,
        this.frameWidth,
        this.frameHeight,
        this.x, -this.y - this.height,
        this.width, this.height
      );
      ctx.scale(1, -1);
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

  // move(canvas) {
  //   this.oldX = this.x;
  //   this.x += this.velX;


  //   if ((this.x + (this.width / 2)) < 0 || this.x + (this.width / 2) > canvas.width) {
  //     this.velX *= -1;
  //     this.dir = (this.dir === "right") ? "left" : "right";
  //   }
  // }



  move(canvas) {
    this.oldY = this.y;
    this.y += this.velY;

    if (this.bounds) {
      if ((this.y + (this.height)) < this.bounds[0] || this.y + (this.height) > this.bounds[1]) {
        this.velY *= -1;
        // this.dir = (this.dir === "right") ? "left" : "right";
      }
    } else {
      if ((this.y + (this.height)) < 0 || this.y + (this.height) > canvas.height) {
        this.velY *= -1;
        // this.dir = (this.dir === "right") ? "left" : "right";
      }

    }

  }
  //////



  static spider1(pos, bounds, multiplier = 1) {
    return {
      name: "spider",
      image: "./assets/spider.png",
      frameNum: 15,
      pos: pos,
      width: 93,
      height: 102,
      health: 110,
      velX: 0,
      velY: 1,
      damage: 25,
      bounds: bounds,
      multiplier: multiplier
    };
  }
  static spider2(pos, bounds, multiplier = .6) {
    return {
      name: "spider",
      image: "./assets/spider.png",
      frameNum: 15,
      pos: pos,
      width: 60.5,
      height: 76,
      health: 70,
      velX: 0,
      velY: 1.5,
      damage: 30,
      bounds: bounds,
      multiplier: multiplier
    };
  }
  static spider3(pos, bounds, multiplier = 0.2) {
    return {
      name: "spider",
      image: "./assets/spider.png",
      frameNum: 15,
      pos: pos,
      width: 46.5,
      height: 56,
      health: 70,
      velX: 0,
      velY: 2.5,
      bounds: bounds,
      damage: 50,
      multiplier: multiplier
    };
  }

}

export default Spider;
