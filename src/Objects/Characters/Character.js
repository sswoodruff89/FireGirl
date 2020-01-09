import GameObject from "../GameObject";

const GRAVITY = 0.5;
const FRICTION = 0.5;

class Character extends GameObject {
  constructor(options) {
    super({ 
      name: options.name, 
      pos: options.pos, 
      ctx: options.ctx, 
      width: options.width,
      height: options.height
    });
    this.vel = [0, 0];
    this.health = 200;
 
    
  }

  loadImage() {
    let spriteMap = new Image();
    spriteMap.src = "./assets/charSprite.png";
    return spriteMap;
    // this.tileMap.onLoad = this.drawLevel(ctx);
  }

  // drawModel() {
  //   this.ctx.beginPath();
  //   this.ctx.rect(20, 40, 40, 70);
  //   this.ctx.fillStyle = "#FF000";
  //   this.ctx.fill();
  //   this.ctx.closePath();

  // }

  
}

export default Character;