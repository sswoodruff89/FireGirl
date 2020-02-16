import Character from "./Objects/Characters/Character";
import Collision from "./util/Collision";
import Projectile from "./Objects/Projectiles/Projectile";


const CONSTANTS = {
  GRAVITY: 1,
  FRICTION: 1.5,
  MAX_VEL: 50,
};

class Player {
  constructor(ctx, canvas, pos) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.character = new Character({
      name: "Seisa",
      pos: pos,
      ctx: this.ctx,
      canvas: this.canvas,
      width: 42.5,
      height: 82
    });

    this.health = this.character.health;
    this.damageMeter = 0;
    this.damageBoost = false;

    this.shield = false;
    this.superShield = false;

    this.spriteMap = this.character.loadImage();
    this.fireballs = {};
    
    this.vel = this.character.vel;
    this.x = this.character.x;
    this.y = this.character.y;
    this.idleWidth = 42.5;
    this.runWidth = 57;
    this.oldX = this.x;
    this.oldY = this.y;
    this.width = this.character.width;
    this.height = this.character.height;
    this.velX = this.vel[0];
    this.velY = this.vel[1];
    this.onGround = false;
    this.idle = true;
    this.keydown = false;
    this.jumpKey = false;
    this.runningKeyDown = false;
    this.isRunning = false;
    this.crouch = false;
    this.direction = "right";
    this.jumpCount = 2;
    this.canClimb = false;
    this.climbing = false;
    this.frameCount = 0;
    this.attacking = false;
    this.downKey = false;
    this.aura = this.loadImage("./assets/aura.png");
    this.shieldImg = this.loadImage("./assets/shield_aura.png");
    this.superShieldImg = this.loadImage("./assets/shield_aura2.png");

    this.upPressed = false;
    this.attackAnimTimeout = "";
    this.dashing = false;

    this.isHit = false;
    this.dying = false;
    this.dead = false;



    this.drawPlayer = this.drawPlayer.bind(this);
    this.jump = this.jump.bind(this);

    this.shootFire = this.shootFire.bind(this);
    this.blueFire = this.blueFire.bind(this);
    this.fire = this.fire.bind(this);

    this.drawAttack = this.drawAttack.bind(this);
    this.drawRunning = this.drawRunning.bind(this);
    this.drawIdle = this.drawIdle.bind(this);
    this.drawSprite = this.drawSprite.bind(this);
    this.drawJump = this.drawJump.bind(this);
    this.loadImage = this.loadImage.bind(this);

    this.setOldPos = this.setOldPos.bind(this);
    this.inAir = this.inAir.bind(this);
    this.isIdle = this.isIdle.bind(this);
    this.whichDirection = this.whichDirection.bind(this);
    this.setRunning = this.setRunning.bind(this);
    this.setHit = this.setHit.bind(this);

    this.setDamageMeter = this.setDamageMeter.bind(this);
    this.damageBoostCountdown = this.damageBoostCountdown.bind(this);
    this.setShieldTimeOut = this.setShieldTimeOut.bind(this);
    this.setShield = this.setShield.bind(this);
    
    this.setDying = this.setDying.bind(this);
    this.isClimbing = this.isClimbing.bind(this);

    this.rightSide = this.rightSide.bind(this);
    this.leftSide = this.leftSide.bind(this);
    this.topSide = this.topSide.bind(this);
    this.bottomSide = this.bottomSide.bind(this);
    this.midX = this.midX.bind(this);
    this.setCrouch = this.setCrouch.bind(this);
    this.getDirX = this.getDirX.bind(this);
    this.getDirY = this.getDirY.bind(this);
  }

  loadImage(image) {
    let proj = new Image();
    proj.src = image;
    return proj;
  }

  rightSide() {
    return this.x + this.width;
  }

  leftSide() {
    return this.x;
  }

  topSide() {
    if (this.crouch) {
      return this.y + 32.5;
    } else {

      return this.y;
    }
  }

  bottomSide() {
    return this.y + this.height;
  }

  midX() {
    return this.x + (this.width / 2);
  }


  drawPlayer(frameCount) {

    this.setDying();

    if (this.isHit && frameCount % 3 === 0 ) return;
    if (this.velX === 0) {
      if (this.direction === "right") {
        this.ctx.drawImage(
          this.spriteMap,
          0,
          529,
          89,
          175,
          this.x, this.y,
          this.width, this.height
        );

      } else {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          this.spriteMap,
          0,
          529,
          89,
          175,
          -this.x - this.width, this.y,
          this.width, this.height
        );
        this.ctx.scale(-1, 1);
      }

    } else if (this.velX > 0) {
      this.ctx.drawImage(
        this.spriteMap,
        (Math.floor(frameCount / 2) % 12) * 126.25 + 1,
        0,
        126.25,
        175,
        this.x, this.y,
        this.width + 5, this.height
      );
    } else if (this.velX < 0) {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.spriteMap,
        (Math.floor(frameCount / 2) % 12) * 126.25 + 1,
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
        this.spriteMap,
        (Math.floor(frameCount / 2) % 12) * 126.4 + 1,
        0,
        126.4,
        175,
        this.x, this.y,
        this.width + 5, this.height
      );
    } else {

      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        this.spriteMap,
        (Math.floor(frameCount / 2) % 12) * 126.4 + 1,
        0,
        126.4,
        175,
        -(this.x) - this.width, this.y,
        this.width + 5, this.height
      );
      this.ctx.scale(-1, 1);
    } 
  }
  
  
  drawAttack(frameCount, state) {
    switch (state) {
      case "jumping":
        if (this.downKey && this.velY !== 0) {
          if (this.direction === "right") {
            this.ctx.drawImage(
              this.spriteMap,
              (Math.floor(frameCount / 2) % 3) * 123,
              1701,
              123,
              172,
              this.x, this.y,
              this.width + 7, this.height
            );
          } else {
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
              this.spriteMap,
              (Math.floor(frameCount / 2) % 3) * 123,
              1701,
              123,
              172,
              -this.x - this.width, this.y,
              this.width + 7, this.height
            );
            this.ctx.scale(-1, 1);
          }

        } else if (this.velY < 0) {
          if (this.direction === "right") {
            this.ctx.drawImage(
              this.spriteMap,
              (Math.floor(frameCount / 2) % 3) * 108,
              1145,
              108,
              172,
              this.x, this.y,
              this.width + 5, this.height
            );
          } else {
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
              this.spriteMap,
              (Math.floor(frameCount / 2) % 3) * 108,
              1145,
              108,
              172,
              -this.x - this.width, this.y,
              this.width + 5, this.height
            );
            this.ctx.scale(-1, 1);
          }

        } else if (this.velY > 0) {
          if (this.direction === "right") {
            this.ctx.drawImage(
              this.spriteMap,
              (Math.floor(frameCount / 2) % 3) * 108,
              1510,
              108,
              175,
              this.x, this.y,
              this.width, this.height
            );

          } else {
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
              this.spriteMap,
              (Math.floor(frameCount / 2) % 3) * 108,
              1510,
              108,
              175,
              -this.x - this.width, this.y,
              this.width, this.height
            );
            this.ctx.scale(-1, 1);
          }
        }
        break;

      case "running":
        if (this.direction === "right") {
          this.ctx.drawImage(
            this.spriteMap,
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
            this.spriteMap,
            (Math.floor(frameCount / 2) % 4) * 160,
            176,
            160,
            175,
            -this.x - this.width, this.y,
            this.width + (this.width / 3), this.height
          );
          this.ctx.scale(-1, 1);
        };
        break;

      default: 
        if (this.direction === "right") {
          if (this.upPressed) {
            this.ctx.drawImage(
              this.spriteMap,
              (Math.floor(frameCount / 2) % 4) * 89,
              730,
              89,
              195,
              this.x, this.y - (this.height / 10),
              this.width, this.height * 1.1
            );

          } else {
            this.ctx.drawImage(
              this.spriteMap,
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
              this.spriteMap,
              (Math.floor(frameCount / 2) % 4) * 89,
              730,
              89,
              195,
              -this.x - this.width, this.y - (this.height / 10),
              this.width, this.height * 1.1
            );

          } else {
            this.ctx.drawImage(
              this.spriteMap,
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
       break;
    }
   
}

  drawJump(frameCount) {
    if (!this.onGround && this.velY < 0) {
      if (this.direction === "right") {
        this.ctx.drawImage(
          this.spriteMap,
          (Math.floor(frameCount / 2) % 3) * 94,
          959,
          94,
          176,
          this.x, this.y,
          this.width - (this.width / 8), this.height
          // this.width - 5, this.height
        );
      } else {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          this.spriteMap,
          (Math.floor(frameCount / 2) % 3) * 94,
          959,
          94,
          176,
          -this.x - this.width, this.y,
          this.width - (this.width / 8), this.height
        );
        this.ctx.scale(-1, 1);
      }

    } else if (!this.onGround && this.velY > 8) {
      if (this.direction === "right") {
        this.ctx.drawImage(
          this.spriteMap,
          (Math.floor(frameCount / 2) % 2) * 98,
          1325,
          98,
          175,
          this.x, this.y,
          this.width, this.height
        );

      } else {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          this.spriteMap,
          (Math.floor(frameCount / 2) % 2) * 98,
          1325,
          98,
          175,
          -this.x - this.width, this.y,
          this.width, this.height
        );
        this.ctx.scale(-1, 1);
      }

    } else if (!this.onGround && (this.velY >= 0 && this.velY <= 8)){
       this.drawRunning(frameCount);
    }
  }

  drawIdle(frameCount) {
    if (this.crouch) {
        if (this.direction === "right") {
        this.ctx.drawImage(
          this.spriteMap,
          535,
          352,
          112,
          175,
          this.x, this.y,
          this.width + 7, this.height
        );

      } else {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          this.spriteMap,
          535,
          352,
          112,
          175,
          -this.x - this.width, this.y,
          this.width + 7, this.height
        );
        this.ctx.scale(-1, 1);
      }

    } else {
      if (this.direction === "right") {
        this.ctx.drawImage(
          this.spriteMap,
          0,
          529,
          89,
          175,
          this.x, this.y,
          this.width, this.height
        );

      } else {
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(
          this.spriteMap,
          0,
          529,
          89,
          175,
          -this.x - this.width, this.y,
          this.width, this.height
        );
        this.ctx.scale(-1, 1);
      }
    }
  }

  drawSprite(frameCount) {
    this.setDying();

    if (this.damageBoost) {
      this.ctx.drawImage(
        this.aura,
        (Math.floor(frameCount / 3) % 4) * 82,
        0,
        82,
        93,
        this.x - 28, this.y - 42,
        100, 130
      );
    }

    if (this.isHit && frameCount % 3 === 0) return;


    if (this.velY >= 0 && this.velY <= 1) {
      if (this.isRunning) {
        (!this.attacking) ? this.drawRunning(frameCount) : this.drawAttack(frameCount, "running");
      } else {
        (!this.attacking) ? this.drawIdle(frameCount) : this.drawAttack(frameCount, null);
      }
    } else if (!this.onGround) {
      (!this.attacking) ? this.drawJump(frameCount) : this.drawAttack(frameCount, "jumping");
    }

    if (this.damageBoost) {
      this.ctx.drawImage(
        this.aura,
        (Math.floor(frameCount / 3) % 4) * 82,
        0,
        82,
        93,
        this.x - 28, this.y - 42,
        100, 130
      );
    }
    if (this.shield || this.superShield) {
      let shieldAura = (this.superShield) ? this.superShieldImg : this.shieldImg;
      let count = Math.floor(frameCount / 3) % 11;
      this.ctx.drawImage(
        shieldAura,
        (count) * 145.75 + (count * 46.5) + 22,
        0,
        145.75,
        143,
        this.x - 12,
        this.y - 10,
        85,
        100
      );
    }
  }

  shootFire(vert = null) {
    if (!this.damageBoost) {
      this.fire(vert); 
    } else {
      this.blueFire(vert);
    }
  }

  blueFire(vert = null) {

    let key = null;
    for (let i = 1; i <= Object.keys(this.fireballs).length; i++) {
      
      if (!this.fireballs[i]) {
        key = i;
        ///////
        break;
      }
    }

    key = (!key) ? Object.keys(this.fireballs).length + 1: key;
    clearTimeout(this.attackAnimTimeout);
    this.attacking = true;
    this.attackAnimTimeout = setTimeout(() => {
      this.attacking = false;
      this.downKey = false;
    }, 200);

    if (this.direction === "right") {
      if (vert === "up") {
        this.fireballs[key] = new Projectile(
          Projectile.blueFireballVert(
            [this.rightSide() - this.width / 2, this.y + this.height],
            0,
            -30,
            vert
          )
        );
      } else if (vert === "down") {
        this.fireballs[key] = new Projectile(
          Projectile.blueFireballVert(
            [
              this.rightSide() - this.width / 2,
              this.bottomSide() - this.height
            ],
            0,
            30,
            vert
          )
        );
          this.velY = -2;
        
      } else {
        this.fireballs[key] = new Projectile(
          Projectile.blueFireball(
            [
              this.rightSide() - this.width / 10,
              this.topSide() + this.height / 5
            ],
            30,
            0,
            "right"
          )
        );
      }

    } else if (this.direction === "left") {

      if (vert === "up") {
        this.fireballs[key] = new Projectile(
          Projectile.blueFireballVert(
            [this.rightSide() - (this.width * .75),
              this.y + (this.height)],
            0, -30, vert)
        );
      } else if (vert === "down") {
        this.fireballs[key] = new Projectile(
          Projectile.blueFireballVert(
            [this.rightSide() - (this.width / 2),
            this.bottomSide() - this.height],
            0, 30, vert)
        );
        this.velY -= 10;
        this.jumpCount -= 1;
      } else {
        this.fireballs[key] = new Projectile(
          Projectile.blueFireball(
            [
              this.leftSide() - (this.width + (this.width / 2)),
              this.topSide() + (this.height / 5)
            ],
            -30,
            0,
            "left"
          )
        );
      }

    }
    this.fireballs[key].launchSound.play();
  }

  fire(vert = null) {
    if (Object.keys(this.fireballs).length === 3) {
      this.attacking = false;
      return;
    }

    let key;
    for (let i = 1; i <= 3; i++) {
      if (!this.fireballs[i]) {
        key = i;
        clearTimeout(this.attackAnimTimeout);
        this.attacking = true;
        this.attackAnimTimeout = setTimeout(() => {
          this.attacking = false;
          this.downKey = false;
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
            0, -20, vert)
        );
      } else if (vert === "down") {
        this.fireballs[key] = new Projectile(
          Projectile.fireballVert(
            [this.rightSide() - (this.width / 2),
            this.bottomSide() - this.height],
            0, 20, vert)
            );
          this.velY = -2;
        
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
    if (this.shield || this.superShield) return;
    if (!this.isHit) {
      this.isHit = true;
      this.hitCooldown = setTimeout(() => {
        this.isHit = false;
      }, 2000);
      this.health -= damage;
      this.setDamageMeter(damage);
    }
  }

  setDamageMeter(damage) {
    if (!this.damageBoost) {
      this.damageMeter += damage / 2;

      if (this.damageMeter >= 100) {
        this.damageMeter = 100;
        this.damageBoost = true;
        this.damageBoostCountdown();
      }
    }
  }

  damageBoostCountdown() {
    this.damageMeterInterval = setInterval(() => {
      this.damageMeter -= 1;
      if (this.damageMeter <= 0) {
        this.damageMeter = 0;
        clearInterval(this.damageMeterInterval);
        this.damageBoost = false;
      };
    }, 100);
  }

  setShield(int = 10000, superShield) {
    if (superShield) {
      this.superShield = true;
    } else {

      this.shield = true;
    }
    this.setShieldTimeOut(int);
  }

  setShieldTimeOut(int = 10000) {
    this.shieldTimeOut = setTimeout(() => {
      this.shield = false;
    }, int);
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
    if (!this.onGround) {
      this.y += this.velY;
      (this.velY + CONSTANTS.GRAVITY > 25) ? this.velY = 25 : this.velY += CONSTANTS.GRAVITY;
    } else {
      this.velY = 0;
    }
  }

  isClimbing() {
    if (this.climbing && this.canClimb && (this.keydown)) {
      this.y += this.velY;
    } else {
      this.velY = 0;
    }
  }

  jump() {
    if (this.jumpCount === 2) {
      this.climbing = false;
      this.onGround = false;
      this.velY = 0 - 15;
      this.jumpCount = 1;
    } else if (this.jumpCount === 1) {
      this.velY = 0 - 15;
      this.jumpCount = 0;
    }
  }

  climb() {
    this.climbing = (this.climbing) ? false : true;
  }

  setCrouch() {
    if (!this.crouch) {
      this.crouch = true;
      this.velY = 0;
      this.height = 59.5;
      this.velY = 0;
      this.y = this.topSide() - 32.5;
      this.velY = 0;
    } else {
      this.crouch = false;
      this.velY = 0;
      this.y = this.bottomSide() + 82.01;
      this.velY = 0;
      this.height = 82;
      this.velY = 0;
    };
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