import GameObject from "../GameObject";

class Tile extends GameObject{
  constructor(options) {
    super(options);
    this.srcX = options.srcX;
    this.srcY = options.srcY;
    this.tileSize = 60;
    this.tileMap = new Image(600, 600);
    this.tileMap.src = "./src/styles/TileMaps/Tiles_64x64.png";

    // this.tileMapKey = {
    //   1: 
    // };

    this.drawTile = this.drawPlatform.bind(this);
  }

  drawPlatform(ctx) {
    ctx.drawImage(
      this.tileMap,
      this.srcX,
      this.srcY,
      this.width,
      this.height,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
    // ctx.rect(this.x, this.y, this.width, this.height);
    // // this.ctx.translate(this.width / 2, this.height / 2);
    // ctx.fillStyle = "green";
    // ctx.fill();
    // ctx.closePath();
  }
  // drawPlatform(ctx) {
  //   ctx.beginPath();
  //   ctx.rect(this.x, this.y, this.width, this.height);
  //   // this.ctx.translate(this.width / 2, this.height / 2);
  //   ctx.fillStyle = "green";
  //   ctx.fill();
  //   ctx.closePath();
  // }


}

export default Tile;