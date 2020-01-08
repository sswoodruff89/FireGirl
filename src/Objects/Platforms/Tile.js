import GameObject from "../GameObject";

class Tile extends GameObject{
  constructor(options) {
    super(options);

    this.drawTile = this.drawPlatform.bind(this);
  }

  drawPlatform(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    // this.ctx.translate(this.width / 2, this.height / 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    // this.ctx.beginPath();
    // this.ctx.rect(this.x, this.y, this.width, this.height);
    // // this.ctx.translate(this.width / 2, this.height / 2);
    // this.ctx.fillStyle = "green";
    // this.ctx.fill();
    // this.ctx.closePath();
  }

  edgeBounds() {
    return {
      // topLeft: [this.x - x, this.y - y],
      // topRight: [this.x + x, this.y - y],
      // bottomRight: [this.x + x, this.y + y],
      // bottomLeft: [this.x - x, this.y + y]
      topLeft: [this.x, this.y],
      topRight: [this.x + this.width, this.y],
      bottomRight: [this.x + this.width, this.y + this.height],
      bottomLeft: [this.x, this.y + this.height]
    };
  }
}

export default Tile;