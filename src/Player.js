import Character from "./Objects/Characters/Character";
import Collision from "./util/Collision";
import Projectile from "./Objects/Projectiles/Projectile";


const CONSTANTS = {
  GRAVITY: 1,
  FRICTION: 1.5,
  MAX_VEL: 50,
};

class Player {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.character = new Character({
      name: "Seisa",
      pos: [20, 100],
      ctx: this.ctx,
      canvas: this.canvas,
      width: 40,
      height: 54
    });
    this.health = this.character.health;
    this.spriteMap = this.character.loadImage();
    this.fireballs = {};
    
    this.vel = this.character.vel;
    this.x = this.character.x;
    this.y = this.character.y;
    this.idleWidth = 35;
    this.runWidth = 40;
    this.oldX = this.x;
    this.oldY = this.y;
    this.width = this.character.width;
    this.height = this.character.height;
    this.velX = this.vel[0];
    this.velY = this.vel[1];
    this.onGround = false;
    this.idle = true;
    this.keydown = false;
    this.isRunning = false;
    this.direction = "right";
    this.jumpCount = 2;
    this.frameCount = 0;
    this.isHit = false;
    this.dying = false;
    this.dead = false;



    this.drawPlayer = this.drawPlayer.bind(this);
    this.jump = this.jump.bind(this);
    // this.move = this.move.bind(this);
    this.shootFire = this.shootFire.bind(this);


    this.setOldPos = this.setOldPos.bind(this);
    this.inAir = this.inAir.bind(this);
    this.isIdle = this.isIdle.bind(this);
    this.whichDirection = this.whichDirection.bind(this);
    this.setRunning = this.setRunning.bind(this);
    this.setHit = this.setHit.bind(this);
    this.setDying = this.setDying.bind(this);

    // this.getDirX = this.getDirX.bind(this);
    // this.getDirY = this.getDirY.bind(this);
  }

  drawPlayer(frameCount) {
// .74
// .59
    this.setDying();
    if (this.isHit && frameCount % 3 === 0 ) return;
    if (this.velX === 0) {
      if (this.direction === "right") {
        this.ctx.drawImage(
          this.spriteMap,
          (Math.floor(frameCount / 2) % 10) * 147,
          251,
          147,
          251,
          this.x, this.y,
          this.width, this.height
          // this.width - 5, this.height
        );
      } else {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          this.spriteMap,
          (Math.floor(frameCount / 2) % 10) * 147,
          251,
          147,
          251,
          -this.x - this.width, this.y,
          // -this.x - this.width - 5, this.y,
          this.width, this.height
          // this.width - 5, this.height
        );
        this.ctx.scale(-1, 1);
      }
    } else if (this.velX > 0) {
      this.ctx.drawImage(
        this.spriteMap,
        (frameCount % 10) * 186,
        0,
        186,
        251,
        this.x, this.y,
        this.width, this.height
      );
    } else if (this.velX < 0) {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.spriteMap,
        (frameCount % 10) * 186,
        0,
        186,
        251,
        -(this.x) - this.width, this.y,
        this.width, this.height
      );
      this.ctx.scale(-1, 1);

    } 
    ///change this.width and height based on movement
  }

  shootFire(vert = null) {
    if (Object.keys(this.fireballs).length === 3) return;
    let key;
    for (let i = 1; i <= 3; i++) {
      if (!this.fireballs[i]) {
        key = i;
        break;
      }
    }
    if (vert === "up") {
      this.fireballs[key] = new Projectile(
        Projectile.fireballVert(
          [this.rightSide() - (this.width / 2),
          this.bottomSide() + this.height],
          0, -20, vert)
      );
    } else if (vert === "down") {
      this.fireballs[key] = new Projectile(
        Projectile.fireballVert(
          [this.rightSide() - (this.width / 2),
          this.bottomSide() - this.height],
          0, 20, vert)
      );
      this.velY -= 10;
      this.jumpCount -= 1;
    } else if (this.direction === "right") {
      this.fireballs[key] = new Projectile(
        Projectile.fireball(
          [this.rightSide() - this.width,
          this.bottomSide() - (this.height / 1.8)],
          20, 0, "right")
        );
    } else if (this.direction === "left"){
      this.fireballs[key] = new Projectile(
        Projectile.fireball(
          [this.leftSide(),
          this.bottomSide() - (this.height / 1.8)],
          -20, 0, "left")
        );
        
    }

  }
    
  setHit(damage = 10) {
    if (!this.isHit) {
      this.isHit = true;
      this.hitCooldown = setTimeout(() => {
        this.isHit = false;
      }, 2000);
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


  rightSide() {
    return this.x + this.width;
  }

  leftSide() {
    return this.x;
  }

  topSide() {
    return this.y;
  }

  bottomSide() {
    return this.y + this.height;
  }

  
  setOldPos() {
    this.oldX = this.x;
    this.oldY = this.y;
  }

  getDirX() {
    return this.x + this.velX;
  }

  getDirY() {
    return this.y + this.velY;
  }

  isIdle() {
    if (this.velX === 0 && this.velY === 0) {
      this.idle = true;
    } else {
      this.idle = false;
    }
  }

  inAir() {
    if (!this.onGround) {
      this.y += this.velY;
      this.velY += CONSTANTS.GRAVITY;
    } else {
      this.velY = 0;
    }
  }

  jump() {
    if (this.jumpCount === 2) {
      this.onGround = false;
      this.velY = 0 - 15;
      this.jumpCount = 1;
    } else if (this.jumpCount === 1) {
      this.velY = 0 - 15;
      this.jumpCount = 0;
    }
  }



  setRunning() {
    if (this.velX !== 0) {
      this.isRunning = true;
      this.width = this.runWidth;
    } else {
      this.isRunning = false;
      this.width = this.idleWidth;
    }
  }



  whichDirection() {
    this.direction = this.velX >= 0 ? "right" : "left";
  }

}

export default Player;