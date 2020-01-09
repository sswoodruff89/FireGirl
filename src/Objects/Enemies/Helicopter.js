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
    this.velX = (options.velX) ? options.velX : 0;
    this.velY = 0;
    this.enemy = this.loadImage(options.image);
    this.frameNum = options.frameNum;
    this.dir = "right";
    this.frameStartX = 68;
    this.frameStartY = 290;
    this.frameWidth = 116;
    this.frameHeight = 80;
    this.projectiles = {};
    this.dead = false;

    this.loadImage = this.loadImage.bind(this);
    this.drawEnemy = this.drawEnemy.bind(this);
    this.shootProj = this.shootProj.bind(this);
    this.callAttack = this.callAttack.bind(this);
    // this.shootProj();
  }

  loadImage(image) {
    let enemy = new Image();
    enemy.src = image;
    return enemy;
  }

  drawEnemy(ctx, frameCount) {
    if (this.dir === "left") {
      ctx.drawImage(
        this.enemy,
        // 0,
        // 0,

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
    if (Object.keys(this.projectiles).length === 1) return;

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


  collideEnemy(obj1, obj2) {
    if (obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y) {


      if (obj1 instanceof Player && !obj1.isHit) {
        obj1.velY = -(obj1.velY / 3);
        obj1.velX = -(obj1.velX / 3);
        ///hit
        obj1.setHit();
      } else if (obj1 instanceof Projectile) {
        obj1.setHit();
        return true;
      }

    } else {
      return false;
    }
  }

  ////////CPU
  callAttack(frameCount) {
    // let check = frameCount / 400;
    if (frameCount % 60 === 0) {
      this.shootProj();
    }
  }

  move(canvas) {
    this.oldX = this.x;
    this.x += this.velX;


    if ((this.x + (this.width / 2)) < 0 || this.x + (this.width / 2) > canvas.width) {
      this.velX *= -1;
      this.dir = (this.dir === "right") ? "left" : "right";
    }
  }

  //////



  static helicopter(pos) {
    return {
      name: "helicopter",
      image: "./assets/footEn.png",
      frameNum: 3,
      pos: pos,
      width: 200,
      height: 125,
      velX: 3,
      dir: "right"
    };
  }

}

export default Enemy;
