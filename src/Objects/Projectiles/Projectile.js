import GameObject from "../GameObject";
import Collision from "../../util/Collision";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};


class Projectile extends GameObject {
  constructor(options) {
    super(options);
    this.proj = this.loadImage(options.image);
    this.velX = options.velX;
    this.velY = options.velY;
    this.oldX = this.x;
    this.oldY = this.y;
    this.dir = options.dir || "right";
    this.damage = options.damage;

    this.frameStartX = options.frameStartX;
    this.frameStartY = options.frameStartY;
    this.frameWidth = options.frameWidth;
    this.frameHeight = options.frameHeight;
    this.frameNum = options.frameNum;


    this.tileSize = 60;
    
    this.collider = new Collision();
    this.isHit = false;



    this.loadImage = this.loadImage.bind(this);
    this.getTopLeftPos = this.getTopLeftPos.bind(this);
    this.getTopRightPos = this.getTopRightPos.bind(this);
    this.getBottomLeftPos = this.getBottomLeftPos.bind(this);
    this.getBottomRightPos = this.getBottomRightPos.bind(this);
    this.setHit = this.setHit.bind(this);
    this.timeOutHit = this.timeOutHit.bind(this);
    this.updateProjectile = this.updateProjectile.bind(this);
    this.drawProjectile = this.drawProjectile.bind(this);

    this.timeOutHit();
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

  setHit() {
    this.isHit = !this.isHit;
  }

  timeOutHit() {
    this.hitTimeout = setTimeout(() => {
      this.setHit();
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

  static fireball(pos, velX, velY, dir) {
    return {
      pos: pos,
      width: 55,
      height: 16,
      velX: velX,
      velY: velY,
      dir: dir,

      frameStartX: 10,
      frameStartY: 277,
      frameWidth: 65,
      frameHeight: 16,
      frameNum: 8,
      image: "./assets/fireball.png",
      damage: 25
    };
  }

  static fireballVert(pos, velX, velY, dir) {
    return {
      pos: pos,
      width: 16,
      height: 55,
      velX: velX,
      velY: velY,
      dir: dir,

      frameStartX: 10,
      frameStartY: 400,
      frameWidth: 22,
      frameHeight: 35,
      frameNum: 8,
      image: "./assets/fireball.png",
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
      damage: 10
    };
  }
}

export default Projectile;

// const fireball = {
//   name: "fireball"
// }


// };