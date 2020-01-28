import GameObject from "../GameObject";
import Sound from "../../util/Sound";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};

class Item extends GameObject{
  constructor(options) {
    super(options);
    this.item = this.loadImage();
    this.width = options.width;
    this.height = options.height;
    this.velY = options.velY || 0;
    this.frameStartX = options.frameStartX;
    this.frameStartY = options.frameStartY;
    this.frameWidth = options.frameWidth;
    this.frameHeight = options.frameHeight;
    this.frameNum = options.frameNum;
    this.disappear = options.disappear
    this.collectedSound = new Sound(options.soundSrc);

    this.fading = false;

    this.collected = false;

    this.loadImage = this.loadImage.bind(this);
    this.drawItem = this.drawItem.bind(this);
    this.timeOutCollected = this.timeOutCollected.bind(this);


    this.timeOutCollected();
  }

  timeOutCollected() {
    if (this.disappear) {
        this.fadeTimeOut = setTimeout(() => {
          this.fading = true;
        }, 7000);
        this.collectedTimeOut = setTimeout(() => {
            this.collected = true;
        }, 10000)
    }
  }


  loadImage() {
    let item = new Image();
    item.src = "./assets/items.png";
    return item;
  }


  checkCollected(player) {
    if (
      this.x + this.width / 4 < player.x + player.width &&
      this.x + this.width * .75 > player.x &&
      this.y + this.height / 4 < player.y + player.height &&
      this.y + this.height * .75 > player.y
    ) {
      this.collected = true;
      this.collectedSound.play();

      switch (this.name) {
        case "Shield":
          player.setShield();
          return;
        case "Health":
          if (player.health < 200) {
            player.health += 30;
            if (player.health > 200) player.health = 200;
          }
          return;
        default:
          return;
      }
    }
  }

  drawItem(ctx, frameCount) {
    if (this.collected) return;
    this.y += this.velY;
    if ((this.fading) && frameCount % 2 === 0) return;

    ctx.drawImage(
      this.item,
      (frameCount % this.frameNum) * this.frameWidth + this.frameStartX,
      this.frameStartY,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  static shield(pos, disappear) {
    return {
      name: "Shield",
      pos: pos,
      width: 39,
      height: 51,

      frameStartX: 1,
      frameStartY: 0,
      frameWidth: 93,
      frameHeight: 118,
      frameNum: 1,
      soundSrc: Sound.shieldItem(),

      disappear: disappear
    };
  }

  static health(pos, disappear) {
    return {
      name: "Health",
      pos: pos,
      width: 46.5,
      height: 50.5,
      velY: (disappear) ? 0.4 : 0,

      frameStartX: 0,
      frameStartY: 125,
      frameWidth: 93,
      frameHeight: 101,
      frameNum: 1,
      soundSrc: Sound.healItem(),
      disappear: disappear
    }
  }

}

export default Item;


