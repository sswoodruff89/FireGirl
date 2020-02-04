import GameObject from "../GameObject";
import Projectile from "../Projectiles/Projectile";
import Player from "../../Player";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};

class Enemy extends GameObject {
  constructor(options) {
    super(options);
    this.velX = (options.velX) ? options.velX : 0;
    this.velY = (options.velY) ? options.velY : 0;
    this.enemy = this.loadImage(options.image);
    this.frameNum = options.frameNum;
    this.dir = options.dir || "right";
    this.frameStartX = 68;
    this.frameStartY = 290;
    this.frameWidth = 116;
    this.frameHeight = 80;
    this.projectiles = {};
    this.dying = false;
    this.dead = false;
    this.health = options.health;
    this.damage = options.damage;
    this.isHit = false;
    this.trickShot = false;

    this.setHit = this.setHit.bind(this);
    this.setDying = this.setDying.bind(this);
    this.getMidX = this.getMidX.bind(this);
    this.getMidY = this.getMidY.bind(this);

    this.loadImage = this.loadImage.bind(this);
    this.drawEnemy = this.drawEnemy.bind(this);
    this.shootProj = this.shootProj.bind(this);
    this.callAttack = this.callAttack.bind(this);

    // this.callAttack();
  }

  getMidX(x = this.x) {
    return x + (this.width/2);
  }

  getMidY(y = this.y) {
    return y + (this.height/2);
  }



  loadImage(image) {
    let enemy = new Image();
    enemy.src = image;
    return enemy;
  }

  setHit(damage = 10) {
    if (!this.isHit) {
      this.isHit = true;
      this.hitCooldown = setTimeout(() => {
        this.isHit = false;
      }, 500);
      this.health -= damage;
    }
  }

  setDying() {
    if (this.health <= 0) {
      this.dying = true;
      this.damage = 0;
      this.velX = 0;
      this.velY = 0;
      setTimeout(() => {
        this.dead = true;
      }, 1000);
    }
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
        -this.x-this.width, this.y,
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




  ////////CPU
  callAttack() {
    this.attackInterval = setInterval(() => {
      this.shootProj();

    }, 200);
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
      dir: "right",
      health: 100,
      damage: 10
    };
  }

  hitBox(obj1, obj2) {

    if (obj1.y < obj2.y + obj2.height && obj1.y > obj2.y + (obj2.height / 2)) {
      if ((obj2.dir === "right" && obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x + (obj2.width / 3)) ||
        (obj2.dir === "left" && obj1.x < obj2.x + (obj2.width * (2 / 3)) && obj1.x + obj1.width > obj2.x)){
        return true;
      }

    } else if ((obj1.y < (obj2.height / 2) && obj1.y > obj2.y) || obj1.y + obj1.height > obj2.y) {
      if (obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x) {

        return true;
      }
    }

    return false;
  }

}

export default Enemy;
