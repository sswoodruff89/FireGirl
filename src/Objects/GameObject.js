

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
    this.oldX = this.x;
    this.oldY = this.y;
    this.tileSize = 60;



    this.rightSide = this.rightSide.bind(this);
    this.leftSide = this.leftSide.bind(this);
    this.topSide = this.topSide.bind(this);
    this.bottomSide = this.bottomSide.bind(this);

    this.getTopLeftPos = this.getTopLeftPos.bind(this);
    this.getTopRightPos = this.getTopRightPos.bind(this);
    this.getBottomLeftPos = this.getBottomLeftPos.bind(this);
    this.getBottomRightPos = this.getBottomRightPos.bind(this);
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
}

export default GameObject;