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
      pos: [20, 210],
      ctx: this.ctx,
      canvas: this.canvas,
      // width: 30,
      // width: 40,
      width: 42.5,
      height: 82
      // height: 45
      // height: 54
    });
    this.health = this.character.health;
    this.spriteMap = this.character.loadImage();
    this.newSprite = this.character.loadImage2();
    this.fireballs = {};
    
    this.vel = this.character.vel;
    this.x = this.character.x;
    this.y = this.character.y;
    this.idleWidth = 42.5;
    this.runWidth = 57;
    this.attackWidth =
    this.oldX = this.x;
    this.oldY = this.y;
    this.width = this.character.width;
    this.height = this.character.height;
    this.velX = this.vel[0];
    this.velY = this.vel[1];
    this.onGround = false;
    this.idle = true;
    this.keydown = false;
    this.runningKeyDown = false;
    this.isRunning = false;
    this.direction = "right";
    this.jumpCount = 2;
    this.canClimb = false;
    this.climbing = false;
    this.frameCount = 0;
    this.attacking = false;
    this.upPressed = false;
    this.attackAnimTimeout = "";
    this.dashing = false;

    this.isHit = false;
    this.dying = false;
    this.dead = false;



    this.drawPlayer = this.drawPlayer.bind(this);
    this.jump = this.jump.bind(this);
    // this.move = this.move.bind(this);
    this.shootFire = this.shootFire.bind(this);
    this.drawAttack = this.drawAttack.bind(this);
    this.drawRunning = this.drawRunning.bind(this);
    this.drawIdle = this.drawIdle.bind(this);
    this.drawSprite = this.drawSprite.bind(this);

    this.setOldPos = this.setOldPos.bind(this);
    this.inAir = this.inAir.bind(this);
    this.isIdle = this.isIdle.bind(this);
    this.whichDirection = this.whichDirection.bind(this);
    this.setRunning = this.setRunning.bind(this);
    this.setHit = this.setHit.bind(this);
    this.setDying = this.setDying.bind(this);
    this.isClimbing = this.isClimbing.bind(this);
    this.getDirX = this.getDirX.bind(this);
    this.getDirY = this.getDirY.bind(this);
  }

  drawPlayer(frameCount) {
// .74
// .59
    this.setDying();
    // this.isIdle();
    if (this.isHit && frameCount % 3 === 0 ) return;
    if (this.velX === 0) {
      if (this.direction === "right") {
        this.ctx.drawImage(
          this.newSprite,
          // this.spriteMap,
          0,
          // this.spriteMap,
          529,
          89,
          175,
          this.x, this.y,
          this.width, this.height
          // this.width - 5, this.height
        );
      } else {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          // this.spriteMap,
          // (Math.floor(frameCount / 2) % 10) * 147,
          // 251,
          // 147,
          // 251,
          this.newSprite,
          0,
          529,
          89,
          175,
          -this.x - this.width, this.y,
          // -this.x - this.width - 5, this.y,
          this.width, this.height
          // this.width - 5, this.height
        );
        this.ctx.scale(-1, 1);
      }
    } else if (this.velX > 0) {
      this.ctx.drawImage(
        this.newSprite,
        // this.spriteMap,
        (Math.floor(frameCount / 2) % 12) * 126.25 + 1,
        // this.spriteMap,
        0,
        126.25,
        175,
        this.x, this.y,
        this.width + 5, this.height
      );
    } else if (this.velX < 0) {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.newSprite,
        // this.spriteMap,
        (Math.floor(frameCount / 2) % 12) * 126.25 + 1,
        // this.spriteMap,
        0,
        126.25,
        175,
        -(this.x) - this.width, this.y,
        this.width + 5, this.height
      );
      this.ctx.scale(-1, 1);

    } 
    ///change this.width and height based on movement
  }

  drawRunning(frameCount) {
    if (this.direction === "right") {
      this.ctx.drawImage(
        this.newSprite,
        // this.spriteMap,
        (Math.floor(frameCount / 2) % 12) * 126.4 + 1,
        // this.spriteMap,
        0,
        126.4,
        175,
        this.x, this.y,
        this.width + 5, this.height
      );
    } else {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.newSprite,
        // this.spriteMap,
        (Math.floor(frameCount / 2) % 12) * 126.4 + 1,
        // this.spriteMap,
        0,
        126.4,
        175,
        -(this.x) - this.width, this.y,
        this.width + 5, this.height
      );
      this.ctx.scale(-1, 1);

    } 
  }


  drawAttack(frameCount, isRunning) {
    if (isRunning) {
      if (this.direction === "right") {
        this.ctx.drawImage(
          this.newSprite,
          (Math.floor(frameCount / 2) % 4) * 160,
          176,
          160,
          175,
          this.x, this.y,
          this.width + (this.width / 3), this.height
        );
      } else if (this.direction === "left") {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          this.newSprite,
          (Math.floor(frameCount / 2) % 4) * 160,
          176,
          160,
          175,
          -this.x - this.width, this.y,
          this.width + (this.width / 3), this.height
        );
        this.ctx.scale(-1, 1);
      }
    } else {

      if (this.direction === "right") {
        if (this.upPressed) {
          this.ctx.drawImage(
            this.newSprite,
            (Math.floor(frameCount / 2) % 4) * 89,
            730,
            89,
            195,
            this.x, this.y - (this.height / 10),
            this.width, this.height * 1.1
          );
        } else {
          this.ctx.drawImage(
            this.newSprite,
            (Math.floor(frameCount / 2) % 4) * 125.1,
            353,
            123.25,
            175,
            this.x, this.y,
            this.width + (this.width / 2.5), this.height
          );
        }
      } else if (this.direction === "left") {
        this.ctx.scale(-1, 1);
        if (this.upPressed) {
          this.ctx.drawImage(
            this.newSprite,
            (Math.floor(frameCount / 2) % 4) * 89,
            730,
            89,
            195,
            -this.x - this.width, this.y - (this.height / 10),
            this.width, this.height * 1.1
          );
        } else {
          this.ctx.drawImage(
            this.newSprite,
            (Math.floor(frameCount / 2) % 4) * 125.1,
            353,
            123.25,
            175,
            -this.x - this.width, this.y,
            this.width + (this.width / 2.5), this.height
          );
        }
        this.ctx.scale(-1, 1);
    }
  }
}

  drawIdle(frameCount) {
    if (this.direction === "right") {
      this.ctx.drawImage(
        this.newSprite,
        0,
        529,
        89,
        175,
        this.x, this.y,
        this.width, this.height
        // this.width - 5, this.height
      );
    } else {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.newSprite,
        0,
        529,
        89,
        175,
        -this.x - this.width, this.y,
        // -this.x - this.width - 5, this.y,
        this.width, this.height
        // this.width - 5, this.height
      );
      this.ctx.scale(-1, 1);
    }
  }

  drawSprite(frameCount) {
    this.setDying();
    // this.isIdle();
    if (this.isHit && frameCount % 3 === 0) return;

    if (this.isRunning) {
      (!this.attacking) ? this.drawRunning(frameCount) : this.drawAttack(frameCount, this.isRunning);
    } else {
      (!this.attacking) ? this.drawIdle(frameCount) : this.drawAttack(frameCount, this.isRunning);
    }
  }



  shootFire(vert = null) {
    if (Object.keys(this.fireballs).length === 3) {
      this.attacking = false;
      return;
    }

    console.log("------");
    console.log(this.upPressed);
    console.log(this.attacking);
    let key;
    for (let i = 1; i <= 3; i++) {
      if (!this.fireballs[i]) {
        key = i;
        clearTimeout(this.attackAnimTimeout);
        this.attacking = true;
        this.attackAnimTimeout = setTimeout(() => {
          this.attacking = false
        }, 200)
        ///////
        break;
      }
    }

    if (this.direction === "right") {
      if (vert === "up") {
        this.fireballs[key] = new Projectile(
          Projectile.fireballVert(
            [this.rightSide() - (this.width / 2),
            this.y + (this.height)],
            // [this.rightSide() - (this.width / 2),
            // this.bottomSide() + this.height],
            0, -20, vert)
        );
      } else if (vert === "down") {
        this.fireballs[key] = new Projectile(
          Projectile.fireballVert(
            [this.rightSide() - (this.width / 2),
            this.bottomSide() - this.height],
            0, 20, vert)
            );
          this.velY = -3;
        
      } else {
        this.fireballs[key] = new Projectile(
          Projectile.fireball(
            [this.rightSide() - (this.width / 10),
            this.topSide() + (this.height / 5)],
            20, 0, "right")
        );
      }

    } else if (this.direction === "left") {

      if (vert === "up") {
        this.fireballs[key] = new Projectile(
          Projectile.fireballVert(
            [this.rightSide() - (this.width * .75),
              this.y + (this.height)],
            // [this.rightSide() - (this.width / 2),
            // this.bottomSide() + this.height],
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
      } else {
        this.fireballs[key] = new Projectile(
          Projectile.fireball(
            [
              this.leftSide() - (this.width + (this.width / 2)),
              this.topSide() + (this.height / 5)
            ],
            -20,
            0,
            "left"
          )
        );
      }

    }
    this.fireballs[key].launchSound.play();

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
      this.health = 0;
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
    if (!this.onGround ) {
      this.y += this.velY;
      (this.velY + CONSTANTS.GRAVITY > 25) ? this.velY = 25 : this.velY += CONSTANTS.GRAVITY;
    } else {
      this.velY = 0;
    }
  }

  isClimbing() {
    if (this.climbing && this.canClimb && this.keydown) {
      this.y += this.velY;
    } else {
      this.velY = 0;
    }
  }

  // isDashing() {
  //   if (this.dashing && this.runningKeyDown) {
  //     if (this.velX > 7) {
  //       this.velX -= .1;
  //     } else if (this.velX < -7) {
  //       this.velX += .1;
  //     }
        
  //   } 
  //   // else if (this.dashing && !this.runningKeyDown) {
  //   //   if (this.velX > 0) {
  //   //     this.velX -= .5;
  //   //   } else if (this.velX < 0) {
  //   //     this.velX += .5;
  //   //   }
  //   // }

  // }

  // dash() {
  //   if (this.dashing) return;

  //   this.dashing = true;
  //   this.velX = (this.direction === "right") ? 15 : -15;
  //   this.dashTimeout = setTimeout(() => {
  //     this.dashing = false;
  //   }, 1000)
  // }


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

  climb() {
    this.climb = (this.climb) ? false : true;
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