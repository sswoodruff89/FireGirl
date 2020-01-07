import Object from "../Object";

class Platform extends Object {
  constructor(options) {
    super(options);
    this.x = options.pos[0];
    this.y = options.pos[1];

    // this.drawPlatform = this.drawPlatform.bind(this);
  }

  drawPlatform() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    // this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Platform;