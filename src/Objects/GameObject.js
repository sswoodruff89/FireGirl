

class GameObject {
  constructor(options) {
    this.name = options.name;
    this.pos = options.pos;
    this.ctx = options.ctx;
    this.canvas = options.canvas;
    this.width = options.width;
    this.height = options.height;
    this.x = options.pos[0];
    this.y = options.pos[1];


    this.rightSide = this.rightSide.bind(this);
    this.leftSide = this.leftSide.bind(this);
    this.topSide = this.topSide.bind(this);
    this.bottomSide = this.bottomSide.bind(this);
  }

  rightSide() {
    return this.x + ths.width;
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
}

export default GameObject;