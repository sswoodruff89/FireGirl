import Object from "../Object";

const GRAVITY = 0.5;
const FRICTION = 0.5;

class Character extends Object {
  constructor(options) {
    super({ name: options.name, pos: options.pos });
    this.x = options.pos[0];
    this.y = options.pos[1];
    this.vel = [0, 0];
    this.bounds = {};

    this.characterModel = new createjs.Shape();

    this.characterModel.graphics.beginFill("blue").drawRect(0, 0, 40, 70);
    this.characterModel.x = this.x;
    this.characterModel.y = this.y;
    this.characterModel.regX = 20;
    this.characterModel.regY = 35;
    this.characterModel.setBounds(-20, -35, 40, 70);

    // this.edgeBounds = this.edgeBounds.bind(this);
  }

 

  
}

export default Character;