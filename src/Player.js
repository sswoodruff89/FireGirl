import Character from "./Objects/Characters/Character";

const CONSTANTS = {
  GRAVITY: 0.5,
  FRICTION: 1.5,
  MAX_VEL: 50,
};

class Player {
  constructor() {
    this.character = new Character({name: "Seisa", pos: [20, 545]});
    this.model = this.character.characterModel;
    this.vel = this.character.vel;
    this.x = this.model.x;
    this.y = this.model.y;
    this.velX = this.vel[0];
    this.velY = this.vel[1];
    this.onGround = true;
    this.idle = true;
    this.keydown = false;
    this.direction = "right";
    this.jumpCount = 2;

    this.jump = this.jump.bind(this);
    this.move = this.move.bind(this);
    this.isGrounded = this.isGrounded.bind(this);
    this.isIdle = this.isIdle.bind(this);
    this.whichDirection = this.whichDirection.bind(this);
    this.edgeBounds = this.edgeBounds.bind(this);
    this.isLanded = this.isLanded.bind(this);
  }

  


  move() {
    // this.isLanded();
    this.isGrounded();
    this.whichDirection();

    if (!this.isIdle()) {
      this.x += this.velX;
      this.model.x = this.x;
      
      if (this.direction === "right") {
        if (this.onGround && !this.keydown) {
          // (0 + CONSTANTS.FRICTION > this.velX) ? this.velX = 0 : this.velX /= CONSTANTS.FRICTION;
          (this.velX < 1) ? this.velX = 0 : this.velX /= CONSTANTS.FRICTION;
        }
      } else {
        if (this.onGround && !this.keydown) {
          (this.velX > -1) ? this.velX = 0 : this.velX /= CONSTANTS.FRICTION;
          // (0 - CONSTANTS.FRICTION < this.velX) ? this.velX = 0 : this.velX /= CONSTANTS.FRICTION;
        }
      }
    }

    if (!this.onGround) {
      this.velY += CONSTANTS.GRAVITY;
    } else {
      this.velY = 0;
    }
  }

  jump() {

    if (this.jumpCount > 0) {
      (this.jumpCount === 2) ? this.onGround = false : "";
      this.velY -= 20;
      this.jumpCount -= 1;
    }
  }

  edgeBounds() {
    let bounds = this.model.getBounds();
    let x = bounds.width / 2;
    let y = bounds.height / 2;

    return {
      topLeft: [this.model.x - x, this.model.y - y],
      topRight: [this.model.x + x, this.model.y - y],
      bottomRight: [this.model.x + x, this.model.y + y],
      bottomLeft: [this.model.x - x, this.model.y + y]
    };

  }

  isGrounded() {
    if (!this.onGround) {
      this.y += this.velY;
      this.model.y = this.y;
      this.velY += CONSTANTS.GRAVITY;

      this.isLanded();

    } else {
      this.velY = 0;
    }
  }

  isIdle() {
    return this.velX === 0 && this.velY === 0;
  }

  whichDirection() {
    this.direction = (this.velX > 0) ? "right" : "left";
  }
  
  isLanded() {
    let bounds = this.edgeBounds();

    if (bounds.bottomLeft[1] === 580 || bounds.bottomRight[1] === 580) {

      this.onGround = true;
      this.jumpCount = 2;
    }
  }


}

export default Player;