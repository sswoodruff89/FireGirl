import Enemy from "./Enemy";

import GameObject from "../GameObject";


const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};

class EasterEgg extends GameObject {
  constructor(options) {
    super(options);
    this.velX = options.velX || 0;
    this.velY = 0;
    this.image1 = this.loadImage(
      "./assets/grad1.png"
    );
    this.image2 = this.loadImage(
      "./assets/grad2.png"
    );
    this.isHit = false;
    this.active = false;
    this.projectiles = {};
    this.damage = 0;
    this.points = 1000;
    this.health = options.health;

    this.move = this.move.bind(this);
    this.setHit = this.setHit.bind(this);
    this.setDying = this.setDying.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.drawEnemy = this.drawEnemy.bind(this);
  }
  
  loadImage(image) {
    let pic = new Image();
    pic.src = image;
    return pic;
  }

  setHit(damage) {
    this.health -= 1;
    clearTimeout(this.changeTimeout);
    this.changeTimeout = setTimeout(() => {
        this.isHit = !this.isHit;
    }, 25)
  }

  drawEnemy(ctx, frameCount) {
    this.setDying();
    if ((this.dying) && frameCount % 3 === 0) return;

    if (!this.isHit) {
      ctx.drawImage(
        this.image1,
        0,
        0,
        431,
        361,
        this.x - 15.5,
        this.y - 20,
        431,
        361
      );
    } else {
      ctx.drawImage(
        this.image2,
        0,
        0,
        431,
        361,
        this.x - 15.5,
        this.y - 20,
        431,
        361
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

    if (this.x + this.width / 2 < 0 || this.x + this.width / 2 > canvas.width) {
      this.velX *= -1;
      this.dir = this.dir === "right" ? "left" : "right";
    }
  }

  //////

  static egg1(pos, dir = "right") {
    return {
      name: "egg",
      frameNum: 3,
      pos: pos,
      width: 400,
      height: 300,
      health: 500,
      velX: 0,
      dir: dir
    };
  }
}

export default EasterEgg;
