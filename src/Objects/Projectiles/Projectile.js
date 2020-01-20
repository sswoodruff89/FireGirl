import GameObject from "../GameObject";
import Collision from "../../util/Collision";
import Sound from "../../util/Sound";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};


class Projectile extends GameObject {
  constructor(options) {
    super(options);
    this.proj = this.loadImage(options.image);
    // this.impact = ;
    this.velX = options.velX;
    this.velY = options.velY;
    this.oldX = this.x;
    this.oldY = this.y;
    this.dir = options.dir || "right";
    this.damage = options.damage;
    this.impacted = false;
    this.impactTimeout = options.impactTimeout || 0;
    this.impactSrc = options.impact;
    
    this.frameStartX = options.frameStartX;
    this.frameStartY = options.frameStartY;
    this.frameWidth = options.frameWidth;
    this.frameHeight = options.frameHeight;
    this.frameNum = options.frameNum;

    this.impactWidth = options.impactWidth;
    this.impactHeight = options.impactHeight;
    this.impactFrameWidth = options.impactFrameWidth || this.frameStartX;
    this.impactFrameHeight = options.impactFrameHeight || this.frameStartY;
    this.impactStartX = options.impactStartX || 145;
    this.impactStartY = options.impactStartY || 150;

    this.hitTimeout = options.hitTimeout || 2000;



    this.tileSize = 60;
    
    this.collider = new Collision();
    this.isHit = false;

    this.launchSound = new Sound(Sound.fire());
    // this.impactSound = new Sound({ src: this.mapKeys[this.screen].theme });



    this.loadImage = this.loadImage.bind(this);
    this.getTopLeftPos = this.getTopLeftPos.bind(this);
    this.getTopRightPos = this.getTopRightPos.bind(this);
    this.getBottomLeftPos = this.getBottomLeftPos.bind(this);
    this.getBottomRightPos = this.getBottomRightPos.bind(this);
    this.setHit = this.setHit.bind(this);
    this.timeOutHit = this.timeOutHit.bind(this);
    this.updateProjectile = this.updateProjectile.bind(this);
    this.drawProjectile = this.drawProjectile.bind(this);
    this.drawImpact = this.drawImpact.bind(this);


    this.timeOutHit();
  }

  hitBox() {
    return {
      left: this.x,
      right: this.x + (this.width),
      top: this.y,
      bottom: this.y + (this.height)
    }
  }

  loadImage(image) {
    let proj = new Image();
    proj.src = image;
    return proj;
  }

  getTopLeftPos() {
    let x = Math.floor(this.leftSide() / this.tileSize);
    let y = Math.floor(this.topSide() / this.tileSize);
    return [x, y];
  }

  getTopRightPos() {
    let x = Math.floor(this.rightSide() / this.tileSize);
    let y = Math.floor(this.topSide() / this.tileSize);
    return [x, y];
  }
  getBottomLeftPos() {
    let x = Math.floor(this.leftSide() / this.tileSize);
    let y = Math.floor(this.bottomSide() / this.tileSize);
    return [x, y];
  }
  getBottomRightPos() {
    let x = Math.floor(this.rightSide() / this.tileSize);
    let y = Math.floor(this.bottomSide() / this.tileSize);
    return [x, y];
  }

  setHit(pos) {

    // setTimeout(() => {
      this.proj.src = this.impactSrc;
      this.impacted = true;
  
      this.velX = 0;
      this.velY = 0;
    
      // clearInterval(this.hitTimeout);
      this.hitTimeout = setTimeout(() => {
        this.isHit = true;
  
      }, 100)


    // }, this.impactTimeout)
  }

  timeOutHit() {
    this.hitTimeout = setTimeout(() => {
      this.isHit = true;
    }, 2000);
  }


  platformCheck() {
    let colVal;
    let top;
    let bottom;
    let right;
    let left;
    let cols = 15;

    if (this.dir === "left") {
      [left, top] = this.getTopLeftPos();
      colVal = this.physicalMap[top * cols + left];
      this.collider.collidePlatform(
        this,
        left * this.tileSize,
        top * this.tileSize,
        colVal
      );
        
      [left, bottom] = this.getBottomLeftPos();
      colVal = this.physicalMap[bottom * cols + left];
      this.collider.collidePlatform(
        this,
        left * this.tileSize,
        bottom * this.tileSize,
        colVal
      );
    }

    if (this.dir === "right") {
      [right, top] = this.getTopRightPos();
      colVal = this.physicalMap[top * cols + right];
      this.collider.collidePlatform(
        this.player,
        right * this.tileSize,
        top * this.tileSize,
        colVal
      );
  
      [right, bottom] = this.getBottomRightPos();
      colVal = this.physicalMap[bottom * cols + right];

      this.collider.collidePlatform(
        this.player,
        right * this.tileSize,
        bottom * this.tileSize,
        colVal
      );

    }

  }

  updateProjectile() {
    this.oldX = this.x;
    this.oldY = this.y;

    this.x += this.velX;
    this.y += this.velY;
  }

  drawProjectile(ctx, frameCount) {
    if (this.hit) return;

    if (this.impacted) {
      this.drawImpact(ctx, frameCount);
      return;
    }

    this.updateProjectile();
    if (this.dir === "up") {
      ctx.scale(1, -1);

      ctx.drawImage(
        this.proj,
        (frameCount % this.frameNum) * 43 + (((frameCount % this.frameNum) + 1) * 21),
        this.frameStartY,
        this.frameWidth,
        this.frameHeight,
        this.x, -this.y + this.height,
        this.width, this.height
      );
      ctx.scale(1, -1);


    } else if (this.dir === "down") {

      ctx.drawImage(
        this.proj,
        (frameCount % this.frameNum) * 43 + (((frameCount % this.frameNum) + 1) * 21),
        this.frameStartY,
        this.frameWidth,
        this.frameHeight,
        this.x, this.y,
        this.width, this.height
      );


    } else if (this.dir === "right") {
      ctx.drawImage(
        this.proj,
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
        this.proj,
        (frameCount % this.frameNum) * this.frameWidth + this.frameStartX,
        this.frameStartY,
        this.frameWidth,
        this.frameHeight,
        -this.x-this.frameWidth, this.y,
        this.width, this.height
      );
      ctx.scale(-1, 1);

    }
  }

  drawImpact(ctx, frameCount) {
    if (this.dir === "up") {
      ctx.drawImage(
        this.proj,
        this.impactStartX,
        this.impactStartY,
        this.impactFrameWidth,
        this.impactFrameHeight,
        this.x - (this.impactFrameWidth / 2), this.y - (this.impactFrameHeight / 2),
        this.impactWidth, this.impactHeight
      );


    } else if (this.dir === "down") {

      ctx.drawImage(
        this.proj,
        this.impactStartX,
        this.impactStartY,
        this.impactFrameWidth,
        this.impactFrameHeight,
        this.x - (this.impactFrameWidth / 2), this.y + this.height - (this.impactFrameHeight / 2),
        this.impactWidth, this.impactHeight
      );


    } else if (this.dir === "right") {
      ctx.drawImage(
        this.proj,
        this.impactStartX,
        this.impactStartY,
        this.impactFrameWidth,
        this.impactFrameHeight,
        this.x + this.width / 3, this.y - (this.height * 2),
        this.impactWidth, this.impactHeight
      );
    } else {
      ctx.drawImage(
        this.proj,
        this.impactStartX,
        this.impactStartY,
        this.impactFrameWidth,
        this.impactFrameHeight,
        this.x - this.width / 3, this.y - (this.impactFrameHeight / 3),
        this.impactWidth, this.impactHeight
      );
    }
  }

  static fireball(pos, velX, velY, dir) {
    return {
      pos: pos,
      width: 35,
      height: 12,
      velX: velX,
      velY: velY,
      dir: dir,

      frameStartX: 10,
      frameStartY: 277,
      frameWidth: 65,
      frameHeight: 16,
      frameNum: 8,
      image: "./assets/fireball.png",
      impact: "./assets/burst.png",
      impactWidth: 60,
      impactHeight: 60,
      impactStartX: 145,
      impactStartY: 150,
      impactFrameWidth: 90,
      impactFrameHeight: 90,
      damage: 25
    };
  }

  static fireballVert(pos, velX, velY, dir) {
    return {
      pos: pos,
      width: 12,
      height: 35,
      velX: velX,
      velY: velY,
      dir: dir,
      impact: "./assets/burst.png",

      frameStartX: 10,
      frameStartY: 400,
      frameWidth: 22,
      frameHeight: 35,
      frameNum: 8,
      image: "./assets/fireball.png",
      impactFrameWidth: 90,
      impactFrameHeight: 90,
      impactWidth: 60,
      impactHeight: 60,
      impactStartX: 145,
      impactStartY: 150,
      damage: 25
    };
  }

  static helibullet(pos, velX, velY, dir) {
    return {
      pos: pos,
      width: 25,
      height: 25,
      velX: velX,
      velY: velY,
      dir: dir,
      frameStartX: 420,
      frameStartY: 330,
      frameWidth: 15,
      frameHeight: 15,
      frameNum: 1,
      image: "./assets/footEn.png",
      impact: "./assets/burst.png",
      damage: 10
    };
  }

  static electricBall(pos, velX = 0, velY = 1, dir = "right") {
    return {
      pos: pos,
      width: 78.5,
      height: 86,
      velX: velX,
      velY: velY,
      dir: "up",
      frameStartX: 0,
      frameStartY: 435,
      frameWidth: 180,
      frameHeight: 145,
      frameNum: 4,
      image: "./assets/electric_ball.png",
      impact: "./assets/electric_ball.png",
      impactTimeout: 6000,
      impactWidth: 180,
      impactHeight: 145,
      impactFrameWidth: 180,
      impactFrameHeight: 145,
      hitTimeout: 6000,
      damage: 20
    };
  }
}

export default Projectile;

// const fireball = {
//   name: "fireball"
// }


// };