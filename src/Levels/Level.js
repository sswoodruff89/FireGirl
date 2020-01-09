import Tile from "../Objects/Platforms/Tile";
import Enemy from "../Objects/Enemies/Enemy";

class Level {
  constructor(options) {
    // console.log(options);
    // this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.renderMap = options.renderMap;
    this.physicalMap = options.physicalMap;

    this.cols = 15;
    this.rows = 10;
    this.tileSize = 60;
    this.tileMap = this.loadImage();
    this.mapTileSize = this.tileMap.width / this.rows;
    // this.enemies = {
    //   1: new Enemy,
    // }
    // this.tileMap = new Image(480, 480);
    // this.tileMap.src = "./tileGen.png";

    

    this.getTile = this.getTile.bind(this);
    this.getLeft = this.getLeft.bind(this);
    this.getRight = this.getRight.bind(this);
    this.getTop = this.getTop.bind(this);
    this.getBottom = this.getBottom.bind(this);
    this.drawLevel = this.drawLevel.bind(this);
    this.loadImage = this.loadImage.bind(this);

    // this.loadImage(this.ctx);
  }

//15 x 10

  loadImage() {
    let tileMap = new Image();
    tileMap.src = "./assets/tileGen.png";
    return tileMap;
  }

  getTile(col, row) {
    return this.renderMap[row * this.cols + col];
  }

  getLeft(col, row) {
    return Math.floor(col * this.tileSize);
  }
  getRight(col, row) {
    return Math.floor((col * this.tileSize) + this.tileSize);
  }
  getTop(col, row) {
    return Math.floor(row * this.tileSize - this.tileSize);
  }
  getBottom(col, row) {
    return Math.floor(row * this.tileSize);
  }

  drawLevel(ctx) {

    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        let tile = this.getTile(c, r);
        if (tile > 0) {

          ctx.drawImage(
            this.tileMap,
            ((tile % 8) - 1) * (this.tileMap.width/ 8),
            (Math.floor(tile / 8) * (this.tileMap.width / 8)),
            this.tileSize,
            this.tileSize,
            c * this.tileSize,
            r * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }
  }


}

export default Level;



// let map = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ];
// let physicalMap = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1],
// ];
// let map = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ];