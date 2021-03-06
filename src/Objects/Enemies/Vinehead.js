import Enemy from "./Enemy";

import GameObject from "../GameObject";
import Projectile from "../Projectiles/Projectile";
import Player from "../../Player";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};

class Vinehead extends Enemy {
  constructor(options) {
    super(options);
    this.player = options.player;

    this.velX = options.velX || 0;
    this.velY = 0;
    this.image = options.image || "./assets/vinehead.png";
    this.enemy = this.loadImage(this.image);
    this.frameNum = options.frameNum || 8;
    this.frameStartX = 0;
    this.frameStartY = 0;
    this.frameWidth = options.frameWidth || 57;
    this.frameHeight = options.frameHeight || 87;
    this.active = true;
    this.opening = false;
    this.projectiles = {};
    this.playerCheckTimeout = "";
    this.damage = 20;

    this.points = Math.floor(5 * options.multiplier);

    this.drawEnemy = this.drawEnemy.bind(this);
    this.shootProj = this.shootProj.bind(this);
    this.checkPlayerPos = this.checkPlayerPos.bind(this);
    this.callAttack = this.callAttack.bind(this);


  }

  checkPlayerPos(x, y, homing) {
    if (y > this.y) {
      this.velY = 1;
    } else {
      this.velY = -1;
    }

    if ((y > this.y && y < this.y + this.height) && (x > this.x || x < this.x) ) {
      this.velX = (this.dir === "left") ? -5 : 5;
    } else {
      this.velX = (this.dir === "left") ? -1 : 1;
    }

    if (x > this.x && this.dir === "left") {
      this.playerCheckTimeout = setTimeout(() => {
        this.velX = 1;
        this.dir = "right";
      }, 1000);
    } else if (x < this.x && this.dir === "right") {
      this.playerCheckTimeout = setTimeout(() => {
        this.velX = -1;
        this.dir = "left";

      }, 1000);
      
    } else if ((x > this.x && this.dir === "right") || (x < this.x && this.dir === "left")) {
      clearTimeout(this.playerCheckTimeout);
    }
  }

  setPlayerCheckInterval(player) {
    this.playerCheckInterval = setInterval(() => {
      this.checkPlayerPos(player);
    }, 2);
  }

  drawEnemy(ctx, frameCount) {
    this.setDying();
    if ((this.isHit || this.dying) && frameCount % 3 === 0) return;

    if (this.dir === "right") {

      ctx.drawImage(
        this.enemy,
        (Math.floor(frameCount / 1.5) % this.frameNum) * this.frameWidth,
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

  move(canvas, player) {
    this.oldY = this.y;
    this.oldX = this.x;
    this.x += this.velX;
    this.y += this.velY;
    this.checkPlayerPos(player.x, player.y);

  }

  //////



  static vine1(pos, player, dir = "right", multiplier = .6) {
    
    return {
      name: "vinehead",
      image: "./assets/vinehead.png",
      frameNum: 8,
      pos: pos,
      width: 65,
      height: 95,
      health: 75,
      velX: 1,
      dir: dir,
      player: player,
      multiplier: multiplier
    };
  }
  static vine2(pos, player, dir = "right", multiplier = 1) {
    
    return {
      name: "vinehead",
      image: "./assets/vinehead.png",
      frameNum: 8,
      pos: pos,
      width: 100,
      height: 145,
      health: 120,
      velX: 1,
      dir: dir,
      player: player,
      multiplier: multiplier
    };
  }
  static vine3(pos, player, dir = "right", multiplier = .25) {
    
    return {
      name: "vinehead",
      image: "./assets/vinehead.png",
      frameNum: 8,
      pos: pos,
      width: 35,
      height: 45,
      health: 50,
      velX: 1,
      dir: dir,
      player: player,
      multiplier: multiplier
    };
  }
  

}

export default Vinehead;
