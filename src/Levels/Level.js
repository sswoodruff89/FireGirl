import Tile from "../Objects/Platforms/Tile";
import Enemy from "../Objects/Enemies/Enemy";
import Helicopter from "../Objects/Enemies/Helicopter";
import Flower from "../Objects/Enemies/Flower";
import Vinehead from "../Objects/Enemies/Vinehead";
import BossVinehead from "../Objects/Enemies/BossVinehead";

class Level {
  constructor(options) {
    this.ctx = options.ctx;
    this.player = options.player;
    this.mapKeys = options.mapKeys;
    this.screen = 5;
    this.renderMap = options.renderMap || this.mapKeys[this.screen].renderMap;
    this.physicalMap = options.physicalMap || this.mapKeys[this.screen].physicalMap;
    this.cols = 15;
    this.rows = 10;
    this.tileSize = 60;
    this.tileMap = this.loadImage();
    this.mapTileSize = this.tileMap.width / this.rows;
    this.enemies = this.mapKeys[this.screen].enemies;
    this.enemyCount = 1;

    

    this.getTile = this.getTile.bind(this);
    this.getLeft = this.getLeft.bind(this);
    this.getRight = this.getRight.bind(this);
    this.getTop = this.getTop.bind(this);
    this.getBottom = this.getBottom.bind(this);
    this.drawLevel = this.drawLevel.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.loadLevel = this.loadLevel.bind(this);
    this.enemiesInterval = this.enemiesInterval.bind(this);
    this.spawnEnemies = this.spawnEnemies.bind(this);
    // this.loadImage(this.ctx);

    this.enemiesInterval();

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

  enemiesInterval() {
    if (this.screen < 5) return;
    this.spawnInterval = setInterval(() => {
      this.spawnEnemies();
    }, 9000);
  }

  spawnEnemies() {

    console.log(this.enemies[1].health);
    console.log(this.enemies);
    console.log(this.enemyCount);
    if (Object.keys(this.enemies).length >= 8) return;
    this.enemyCount++;
    let key = this.enemyCount;
    let y = Math.random() * 600;
    this.enemies[key] = new Vinehead(Vinehead.vine3([890, y], this.player, "left"));
  }

  loadLevel(num) {
    // if (this.screen + num === 0) return;
    this.screen += num;

    this.renderMap = this.mapKeys[this.screen].renderMap;
    this.physicalMap = this.mapKeys[this.screen].physicalMap;
    this.enemies = this.mapKeys[this.screen].enemies;
    this.enemiesInterval();
  }

  drawLevel(ctx) {

    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        let tile = this.getTile(c, r);
        let tileCut = (tile % 8 === 0) ? 8 : (tile % 8);

        if (tile > 0) {

          ctx.drawImage(
            this.tileMap,
            (tileCut - 1) * (this.tileMap.width/ 8),
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
          0, 42, 41, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 42,
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
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
        ],
        enemies: {
          1: new Helicopter(Helicopter.hel1([100, 100])),
          2: new Helicopter(Helicopter.hel1([570, 50], "left")),
          3: new Flower(Flower.flow1([600, 500])),
          4: new Flower(Flower.flow1([400, 320])),
          5: new Flower(Flower.flow1([240, 500])),
 
        }
      },
      2: {
        renderMap: [
          0,  0,  0,  0, 38, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0, 38, 39,  0,  0, 42, 41, 39,
         41, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0, 17,  0,  0,  0, 17,  0,  0,  0,  0,  0,
          0,  0,  0, 17,  0, 16,  0, 17,  0, 16,  0,  3,  1,  1,  1,
          0,  0,  0, 16,  0,  0,  0, 16,  0,  0,  0,  6,  6,  6,  6,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  6,  6,  6,  6,
          1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  6,  6,  6,  6,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  6,  6,  6,  6
        ],
        physicalMap: [
          0,  0,  0,  0, 38, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0, 38, 39,  0,  0, 42, 41, 39,
         41, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  6,  0,  0,  0,  6,  0,  0,  0,  0,  0,
          0,  0,  0,  6,  0,  7,  0,  6,  0,  7,  0,  3,  1,  1,  1,
          0,  0,  0,  7,  0,  0,  0,  7,  0,  0,  0,  6,  6,  6,  6,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  6,  6,  6,  6,
          1,  1,  1,  8,  0,  0,  0,  0,  0,  0,  0,  6,  6,  6,  6,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  6,  6,  6,  6
        ],
        enemies: {
          1: new Helicopter(Helicopter.hel1([100, 25])),
          3: new Flower(Flower.flow2([290, 190])),
          5: new Vinehead(Vinehead.vine1([500, 100], this.player)),

          4: new Flower(Flower.flow2([530, 190])),

        }
      },
      3: {
        renderMap: [
          0,  0, 38, 39,  0,  0,  0, 42, 41, 39,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 38,
         38, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,
          0,  0,  0,  0,  0,  3,  1,  1,  1,  2,  0,  0,  0,  3,  5,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4, 28,
          1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
          9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 16, 16, 16, 16,
          0,  0, 38, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  3,  1,  1,  1,  2,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  5,  5,  5,  5,  5,  0,  1,  1,  1,  1
        ],
        physicalMap: [
          0,  0, 38, 39,  0,  0,  0, 42, 41, 39,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 38,
         38, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,
          0,  0,  0,  0,  0,  3,  1,  1,  1,  8,  0,  0,  0,  2,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
          9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  7,  7,  7,  7,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  3,  1,  1,  1,  2,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  9,  0,  0,  0, 10,  0,  1,  1,  1,  1
        ],
        enemies: {
          1: new Helicopter(Helicopter.hel2([500, 0])),
          // // 3: new Flower(Flower.flow2([290, 190])),
          4: new Vinehead(Vinehead.vine3([500, 100], this.player)),
          5: new Vinehead(Vinehead.vine3([300, 450], this.player)),
          6: new Vinehead(Vinehead.vine3([850, 500], this.player)),
          7: new Vinehead(Vinehead.vine1([800, -20], this.player)),

          // 4: new Flower(Flower.flow2([530, 190])),

        }
      },
      4: {
        renderMap: [
          0, 42, 41, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
         39, 29, 29, 29, 29, 29, 29,  0, 29, 29, 29, 29, 29, 29, 29,
          1,  2,  2,  2,  2,  2,  2,  0,  3,  2,  2,  2,  2,  2,  1,
          5,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 13,  5,  5,
         28,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4, 28,
          1,  1,  2,  0,  0, 42, 41, 39,  0,  0,  0,  3,  1,  1,  1,
         16, 16, 16,  0,  0,  0,  0,  0,  0,  0,  0,  5,  5,  5,  5,
          0,  0, 38, 39,  0, 29, 29, 29, 29, 29,  3,  1,  1,  1,  1,
          0,  0,  0,  0,  0,  3,  1,  1,  1,  2,  5,  5,  5,  5,  5,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
        ],
        physicalMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,
          7,  7,  7,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,  1,
          0,  0,  0,  0,  0,  3,  1,  1,  1,  1,  0,  0,  0,  0,  0,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
        ],
        enemies: {
          1: new Vinehead(Vinehead.vine3([10, 530], this.player)),
          2: new Vinehead(Vinehead.vine3([830, 0], this.player)),
          3: new Vinehead(Vinehead.vine2([600, 600], this.player)),
          4: new Vinehead(Vinehead.vine1([500, 100], this.player)),
          5: new Vinehead(Vinehead.vine2([200, 450], this.player)),
          6: new Vinehead(Vinehead.vine2([850, 500], this.player)),
          7: new Vinehead(Vinehead.vine1([800, -20], this.player)),
        }
      },
      5: {
        renderMap: [
          0, 42, 41, 39,  0,  0,  0, 13,  5,  5,  5, 49,  5,  5,  5,
         39,  0,  0,  0,  0,  0,  0,  0, 16, 16, 16, 16, 16, 16, 16,
          2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
         28,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          2,  1, 23,  0,  0, 42, 41, 39,  0,  0,  0,  0,  0,  0,  0,
         28,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          5, 29, 29, 29,  0, 29, 29,  0, 47, 47, 47, 47, 47, 47, 47,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
        ],
        physicalMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          2,  2,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
        ],
        enemies: {
          1: new BossVinehead(BossVinehead.boss1([650, 120], this.player))
        }
      }
    };
  }
  // static level2() {
  //   return {
  //     1: {
  //       renderMap: [
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0, 38, 39,  0,  0,  0,  0,  0,
  //         0, 42, 41, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  6,  6,  6,  6
  //       ],
  //       physicalMap: [
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  //         0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  0,  1,  1,
  //         1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
  //       ],
  //       enemies: {
  //         1: new Helicopter(Helicopter.hel1([100, 100])),
  //         2: new Helicopter(Helicopter.hel1([570, 50], "left")),
  //         3: new Flower(Flower.flow1([600, 500])),
  //         4: new Flower(Flower.flow1([400, 320])),
  //         5: new Flower(Flower.flow1([240, 500])),
  //       }
  //     }
  //   };
  // }

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