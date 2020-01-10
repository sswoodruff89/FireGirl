import Tile from "../Objects/Platforms/Tile";
import Enemy from "../Objects/Enemies/Enemy";
import Helicopter from "../Objects/Enemies/Helicopter";
import Flower from "../Objects/Enemies/Flower";

class Level {
  constructor(options) {
    this.ctx = options.ctx;
    this.mapKeys = options.mapKeys;
    this.renderMap = options.renderMap || this.mapKeys[1].renderMap;
    this.physicalMap = options.physicalMap || this.mapKeys[1].physicalMap;
    this.cols = 15;
    this.rows = 10;
    this.tileSize = 60;
    this.tileMap = this.loadImage();
    this.mapTileSize = this.tileMap.width / this.rows;
    this.enemies = this.mapKeys[1].enemies;

    

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


  static level1() {
    return {
      1: {
        renderMap: [
          9,  0,  0,  0, 42, 41, 39,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0, 38, 39,  0,  0,  0,  0,  0,
          0, 42, 41, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
         28,  0,  0,  0,  0, 22, 23, 23, 63,  0,  0,  0,  0,  0,  0,
          1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0, 29, 29, 29, 29,
          9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3, 27, 27, 27,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
        ],
        physicalMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,
          6,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  1,  1,  1,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
        ],
        enemies: {
          // 1: new Helicopter(Helicopter.hel1([100, 100])),
          // 2: new Helicopter(Helicopter.hel1([570, 50], "left")),
          // 3: new Flower(Flower.flow1([600, 500])),
          // 4: new Flower(Flower.flow1([400, 320])),
          5: new Flower(Flower.flow1([240, 500])),
        }
      }
    }
  }
  static level2() {
    return {
      1: {
        renderMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0, 38, 39,  0,  0,  0,  0,  0,
          0, 42, 41, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  6,  6,  6,  6
        ],
        physicalMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  1,  1,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
        ],
        enemies: {
          1: new Helicopter(Helicopter.hel1([100, 100])),
          2: new Helicopter(Helicopter.hel1([570, 50], "left")),
          3: new Flower(Flower.flow1([600, 500])),
          4: new Flower(Flower.flow1([400, 320])),
          5: new Flower(Flower.flow1([240, 500])),
        }
      }
    };
  }

}

export default Level;


// [
//           0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
//           0,  0,  0,  0,  0,  0,  0,  0, 38, 39,  0,  0,  0,  0,  0,
//           0, 42, 41, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
//           0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
//           0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
//           0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
//           1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
//           9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
//           0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
//           0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  6,  6,  6,  6
//         ],