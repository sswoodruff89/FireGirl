import Character from "./Objects/Characters/Character";
import Collision from "./util/Collision";

const CONSTANTS = {
  GRAVITY: 0.5,
  FRICTION: 1.5,
  MAX_VEL: 50,
};

class Player {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.character = new Character({
      name: "Seisa",
      pos: [20, 400],
      ctx: this.ctx,
      canvas: this.canvas,
      width: 30,
      height: 50
    });

    this.collider = new Collision();
    this.vel = this.character.vel;
    this.x = this.character.x;
    this.y = this.character.y;
    this.width = this.character.width;
    this.height = this.character.height;
    this.velX = this.vel[0];
    this.velY = this.vel[1];
    this.onGround = false;
    this.idle = true;
    this.keydown = false;
    this.direction = "right";
    this.jumpCount = 2;

    this.drawPlayer = this.drawPlayer.bind(this);
    this.jump = this.jump.bind(this);
    this.move = this.move.bind(this);
    // this.getPlayerTilePos = this.getPlayerTilePos.bind(this);

    this.rightSide = this.rightSide.bind(this);
    this.leftSide = this.leftSide.bind(this);
    this.topSide = this.topSide.bind(this);
    this.bottomSide = this.bottomSide.bind(this);

    this.inAir = this.inAir.bind(this);
    this.isIdle = this.isIdle.bind(this);
    this.whichDirection = this.whichDirection.bind(this);
    this.edgeBounds = this.edgeBounds.bind(this);
    // this.isLanded = this.isLanded.bind(this);

    this.resetJump = this.resetJump.bind(this);
    this.resetGrounded = this.resetGrounded.bind(this);
  }

  drawPlayer() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
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

  move() {
    this.whichDirection();

    // this.collider.collidePlayer(this, this.canvas);

    if (!this.isIdle()) {
      this.x += this.velX;
      this.y += this.velY;

      if (this.direction === "right") {
        if (this.onGround && !this.keydown) {
          // (0 + CONSTANTS.FRICTION > this.velX) ? this.velX = 0 : this.velX /= CONSTANTS.FRICTION;
          this.velX < 1 ? (this.velX = 0) : (this.velX /= CONSTANTS.FRICTION);
        }
      } else {
        if (this.onGround && !this.keydown) {
          this.velX > -1 ? (this.velX = 0) : (this.velX /= CONSTANTS.FRICTION);
          // (0 - CONSTANTS.FRICTION < this.velX) ? this.velX = 0 : this.velX /= CONSTANTS.FRICTION;
        }
      }

      if (!this.onGround) {
        this.velY += CONSTANTS.GRAVITY;
      }
    }

    this.inAir();
  }

  // getPlayerTilePos() {
  //   let x = Math.floor(this.x / 60);
  //   let y = Math.floor(this.y / 60);
  //   return [x, y];
  // }

  inAir() {
    if (!this.onGround) {
      this.y += this.velY;
      this.velY += CONSTANTS.GRAVITY;
    } else {
      this.velY = 0;
    }
  }

  jump() {
    if (this.jumpCount > 0) {
      this.jumpCount === 2 ? (this.onGround = false) : "";
      if (this.jumpCount === 1) {
        this.velY = 0 - 15;
      } else {
        this.velY -= 15;
      }
      this.jumpCount -= 1;
    }
  }

  edgeBounds() {
    return {
      // topLeft: [this.x - x, this.y - y],
      // topRight: [this.x + x, this.y - y],
      // bottomRight: [this.x + x, this.y + y],
      // bottomLeft: [this.x - x, this.y + y]
      topLeft: [this.x, this.y],
      topRight: [this.x + this.width, this.y],
      bottomRight: [this.x + this.width, this.y + this.height],
      bottomLeft: [this.x, this.y + this.height]
    };
  }

  isIdle() {
    return this.velX === 0 && this.velY === 0;
  }

  resetGrounded() {
    this.player.onGround = true;
    this.resetJump();
  }

  resetJump() {
    this.player.jumpCount = 2;
  }

  whichDirection() {
    this.direction = this.velX > 0 ? "right" : "left";
  }

  // isLanded() {
  //   let bounds = this.edgeBounds();

  //   if (bounds.bottomLeft[1] === 580 || bounds.bottomRight[1] === 580) {
  //     // if (bounds.bottomLeft[1] === 580 || bounds.bottomRight[1] === 580) {
  //     this.y = 580 - this.height;
  //     this.onGround = true;
  //     this.jumpCount = 2;
  //   }
  // }
}

export default Player;