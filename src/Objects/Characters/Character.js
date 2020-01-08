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
    // this.bounds = {};

    // this.characterModel = new createjs.Shape();

    // this.characterModel.graphics.beginFill("blue").drawRect(0, 0, 40, 70);
    // this.characterModel.x = this.x;
    // this.characterModel.y = this.y;
    // this.characterModel.regX = 20;
    // this.characterModel.regY = 35;
    // this.characterModel.setBounds(-20, -35, 40, 70);

    // this.drawModel = this.drawModel.bind(this);

    // this.edgeBounds = this.edgeBounds.bind(this);
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