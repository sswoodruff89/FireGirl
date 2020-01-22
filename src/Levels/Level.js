import Tile from "../Objects/Platforms/Tile";
import Music from "../util/Music";
import Enemy from "../Objects/Enemies/Enemy";
import Helicopter from "../Objects/Enemies/Helicopter";
import Flower from "../Objects/Enemies/Flower";
import Spider from "../Objects/Enemies/Spider";
import Vinehead from "../Objects/Enemies/Vinehead";
import Jellyfish from "../Objects/Enemies/Jellyfish";
import BossVinehead from "../Objects/Enemies/BossVinehead";

class Level {
  constructor(options) {
    this.ctx = options.ctx;
    this.player = options.player;
    this.mapKeys = options.mapKeys;
    this.screen = Object.keys(this.mapKeys)[0];
    this.renderMap = options.renderMap || this.mapKeys[this.screen].renderMap;
    this.physicalMap = options.physicalMap || this.mapKeys[this.screen].physicalMap;
    this.cols = 15;
    this.rows = 10;
    this.tileSize = options.tileSize;
    this.tileMap = this.loadImage();
    this.mapTileSize = this.tileMap.width / this.rows;
    this.enemies = this.mapKeys[this.screen].enemies();
    this.enemyCount = 1;
    this.theme = new Music({src: this.mapKeys[this.screen].theme});
    
    this.levelLayers = this.loadImages(this.mapKeys[this.screen].levelLayers);
        
////Enemy Rush////
    this.spawnTier = this.mapKeys[this.screen].spawnTier || null;
    this.rushLevel = 0;
    this.spawnTierGroup = 2;
    this.rushInterval = "";

    this.enemyRushSpawn = this.enemyRushSpawn.bind(this);
    this.enemyRushInterval = this.enemyRushInterval.bind(this);

//////

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
    this.enemyRush = this.enemyRush.bind(this);

    this.loadImages = this.loadImages.bind(this);
    this.renderBackground = this.renderBackground.bind(this);
    this.renderMid = this.renderMid.bind(this);
    this.renderFront = this.renderFront.bind(this);
    // this.loadImage(this.ctx);

    this.enemiesInterval();
    // this.enemyRushInterval();
  }

//15 x 10

  loadImage() {
    let tileMap = new Image();
    tileMap.src = "./assets/tileGen.png";
    return tileMap;
  }

  loadImages(images) {
    let background = new Image();
    background.src = images.background;

    let mid = (images.mid) ? new Image() : null;
    (mid) ? mid.src = images.mid : "";

    let front = (images.front) ? new Image() : null;
    (front) ? front.src = images.front : "";

    return {
      background,
      mid,
      front
    };
  }

  renderBackground(ctx, canvas) {

      ctx.drawImage(
        this.levelLayers.background,
        0,
        0,
        900,
        600,
        0,
        0,
        canvas.width,
        canvas.height
      );
  }

  renderMid(ctx, canvas) {
    if (!this.levelLayers.mid) return;
    ctx.drawImage(
      this.levelLayers.mid,
      0,
      0,
      900,
      600,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  renderFront(ctx, canvas) {
    if (!this.levelLayers.front) return;

    ctx.drawImage(
      this.levelLayers.front,
      0,
      0,
      900,
      600,
      0,
      0,
      canvas.width,
      canvas.height
    );
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
    if (parseInt(this.screen) < 6 || parseInt(this.screen) === 8) return;

    // if (parseInt(this.screen) === 8) {
    //   this.enemyRush();
    //   this.spawnInterval = setInterval(() => {
    //     this.enemyRush();
    //   }, 12000);
    // } else {
      
      this.spawnInterval = setInterval(() => {
        if (!this.enemies[1]) {
          clearInterval(this.spawnInterval);
        }
        this.spawnEnemies();
      }, 7000);
    // }
  }

  spawnEnemies() {
    if (Object.keys(this.enemies).length >= 8) return;
    this.enemyCount++;
    let key = this.enemyCount;
    let y = Math.random() * 600;
    this.enemies[key] = new Vinehead(Vinehead.vine2([890, y], this.player, "left"));
  }

  enemyRush() {
    if (Object.keys(this.enemies).length >= 6) return;
    this.enemyCount++;
    let key = this.enemyCount + (Math.floor(Math.random() * 100));
    let y = Math.random() * 600;
    let x = (Object.keys(this.enemies).length % 2 === 0) ? 10 : 890
    this.enemies[key] = new Vinehead(Vinehead.vine2([x, y], this.player, "left"));
  }

  enemyRushSpawn(num) {
    if (Object.keys(this.enemies).length >= num) return;
    let key = this.enemyCount + Math.floor(Math.random() * 100);
    let tierAmount = Object.keys(this.spawnTier[this.spawnTierGroup]).length
    let enemy = Math.floor(Math.random() * tierAmount);

    this.enemies[key] = this.spawnTier[this.spawnTierGroup][enemy]();

    this.spawnTierGroup = (this.spawnTierGroup === 4) ? 1 : this.spawnTierGroup + 1;
  }

  enemyRushInterval(int = 12000, enemyCount = 6) {
    if (this.screen !== "8") return;

    clearInterval(this.rushInterval);
    
    this.rushInterval = setInterval(() => {
      this.enemyRushSpawn(enemyCount);
    }, int);
  }



  loadLevel(num) {
    // if (this.screen + num === 0) return;
    this.screen = num;
    this.renderMap = this.mapKeys[this.screen].renderMap;
    this.physicalMap = this.mapKeys[this.screen].physicalMap;
    this.enemies = this.mapKeys[this.screen].enemies();
    if (this.mapKeys[this.screen].levelLayers) {

      this.levelLayers = this.loadImages(this.mapKeys[this.screen].levelLayers);
    }
    if (this.mapKeys[this.screen].theme) {
      let muted = this.theme.music.muted;
      this.theme.pause();
      this.theme = new Music({ src: this.mapKeys[this.screen].theme });
      this.theme.play();
      this.theme.music.muted = muted;
    }
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
            64,
            64,
            c * this.tileSize,
            r * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }
  }


  static level2() {
    return {
      8: {
        renderMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0, 29, 29, 29,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  3,  1,  2,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0, 29, 29, 29,  0,  0,  0, 29, 29, 29,  0,  0,  0,
          0,  0,  0,  3,  1,  2,  0,  0,  0,  3,  1,  2,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,        ],
        physicalMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  2,  2,  2,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  2,  2,  2,  0,  0,  0,  2,  2,  2,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1
        ],
        enemies: () => {
          return {
            1: new Spider(Spider.spider1([600, 0], [20, 359])),
            2: new Spider(Spider.spider1([420, 0], [20, 179])),
            3: new Spider(Spider.spider1([240, 0], [20, 359])),
            4: new Spider(Spider.spider1([780, 0], [20, 479])),
            5: new Spider(Spider.spider1([60, 0], [20, 479])),
            // 5: new Helicopter(Helicopter.hel1([0, 15], [-50, 950], "right"))
            // 1: new BossVinehead(BossVinehead.boss1([650, 100], this.player))
          };
        },
        spawnTier: {
          1: {
              // 0: () => {
              //   return new Spider(Spider.spider2([600, 0], [20, 359]));
              // },
              // 1: () => {
              //   return new Spider(Spider.spider2([420, 0], [20, 179]));
              // },
              // 2: () => {
              //   return new Spider(Spider.spider2([240, 0], [20, 359]));
              // },
              // 3: () => {
              //   return new Spider(Spider.spider2([780, 0], [20, 479]));
              // },
              // 4: () => {
              //   return new Spider(Spider.spider2([60, 0], [20, 479]));
              // },
              0: () => {
                return new Spider(Spider.spider1([600, 0], [20, 359]));
              },
              1: () => {
                return new Spider(Spider.spider1([420, 0], [20, 179]));
              },
              2: () => {
                return new Spider(Spider.spider1([240, 0], [20, 359]));
              }
            },
            
        2: {
              0: () => {
                return new Helicopter(Helicopter.hel2([800, 50], [-50, 950], "left"));
              },
              1: () => {
                return new Helicopter(Helicopter.hel2([0, 50], [-50, 950], "right"));
              },
              2: () => {
                return new Helicopter(Helicopter.hel1([800, 15], [-50, 950], "left"));
              },
              3: () => {
                return new Helicopter(Helicopter.hel1([0, 15], [-50, 950], "right"));
              },
           },
        3: {
              0: () => {
                let y = Math.random() * 600;
                let x = (y % 2 === 0) ? 1 : 839;
                return new Jellyfish(Jellyfish.jell2([x, y], this.player));
              },
              1: () => {
                let y = Math.random() * 600;
                let x = (y % 2 === 0) ? 1 : 809;
                return new Jellyfish(Jellyfish.jell1([x, y], this.player));
              },
           },
        4: {
              0: () => {
                let y = Math.random() * 600;
                let x = (y % 2 === 0) ? 1 : 890;
                return new Vinehead(Vinehead.vine3([x, y], this.player));
              },
              1: () => {
                let y = Math.random() * 600;
                let x = y % 2 === 0 ? 1 : 890;
                return new Vinehead(Vinehead.vine1([x, y], this.player));
              },
              2: () => {
                let y = Math.random() * 600;
                let x = y % 2 === 0 ? 1 : 890;
                return new Vinehead(Vinehead.vine2([x, y], this.player));
              },
           },
           
        },
        theme: "./assets/Sound/dk3_boss_boogie.mp3",
        levelLayers: {
          background: "./assets/Level1/lv1_back.png",
          // mid: "./assets/Level1/lv1_mid.png",
          // front: "./assets/Level1/lv1_front.png"
        }
      }
    };
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
          0,  0,  0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          3,  3,  3, 40,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0, 23,  2,  2,  2, 24,  0,  0,  0,
          1,  2, 34,  0,  0,  0,  0, 17,  0,  0,  0, 18,  0,  0,  0,
          0,  0,  0, 34,  0,  0,  0, 17,  0,  0,  0, 18,  0,  0,  0,
          1,  1,  1,  1,  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1
        ],
        // physicalMap: [
        //   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        //   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        //   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        //   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        //   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        //   2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        //   0,  0,  0,  0,  0,  2,  2,  2,  2,  0,  0,  0,  0,  0,  0,
        //   6,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
        //   0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
        //   1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1
        // ],
        enemies: () => {
          return {
            // 1: new Spider(Spider.spider2([470, 0], [0, 350])),
            // 2: new Helicopter(Helicopter.hel1([570, 50], "left")),
            1: new Jellyfish(Jellyfish.jell1([300, 300]))
            // 4: new Flower(Flower.flow1([400, 320])),
            // 5: new Flower(Flower.flow1([240, 500])),
          }
 
        },
        theme: "./assets/Sound/ff9_stirring_forest.mp3",
        levelLayers: {
          background: "./assets/Level1/lv1_back.png",
          mid: "./assets/Level1/lv1_mid.png",
          front:  "./assets/Level1/lv1_front.png"
        }
      },
      2: {
        renderMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0, 29, 29, 29,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0, 53, 54,  1,  1,  2,  0,  0,  0,  0,  0,  0,
          0,  0,  0, 57, 58,  9, 16, 16, 16,  0,  0, 29, 29, 29, 29,
          0, 53, 54,  5,  5,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
          1,  5,  5,  5, 11,  0,  0,  0,  0,  0,  0,  5,  5,  5,  5
        ],
        physicalMap: [
        //0       2       4       6       8      10      12
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17,  0,
          0,  0,  0,  0,  0,  0,  0, 12, 39,  0,  0,  0,  0, 17,  0,
          0,  0,  0,  0,  0,  0,  0,  4, 18,  0,  0,  0,  0, 17,  0,
          0,  0, 19, 20,  0,  0,  0,  4, 18, 30,  0,  0,  0, 17,  0,
          0,  0,  4,  5,  0,  0, 37,  4, 40,  0,  0,  0,  0, 31, 16,
          0,  0,  9,  8,  0,  0,  4,  5,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  4,  5,  0,  0,  0, 31, 15, 15, 15,
          0,  0,  0,  0,  0, 35,  0,  5,  0,  0,  0,  0,  4,  0,  0,
          1,  1,  1,  1,  2,  0,  0,  5,  0,  0,  0,  0,  4,  0,  0
        ],
        levelLayers: {
          background: "./assets/Level1/lvl2_back.png",
          mid: "./assets/Level1/lvl2_mid.png",
          front: "./assets/Level1/lvl2_front.png"
        },

        enemies: () => {
          return {
            1: new Helicopter(Helicopter.hel2([10, 10], [0, 700])),
            // 2: new Helicopter(Helicopter.hel2([570, 0], [0, 700], "left")),
            3: new Helicopter(Helicopter.hel2([10, 140], [0, 335], "left")),
            4: new Spider(Spider.spider1([700, 0], [0, 380])),
            5: new Spider(Spider.spider2([600, 0], [20, 440])),
            6: new Spider(Spider.spider3([150, 0], [20, 250]))

            // 3: new Flower(Flower.flow2([120, 200])),
            // 4: new Flower(Flower.flow1([400, 320])),
            // 5: new Flower(Flower.flow1([240, 500])),
          }
        }
      },
      3: {
        renderMap: [
        //0       2       4       6       8      10      12
          0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
         16, 32,  0,  0,  0, 16,  0,  0,  0, 16,  0,  3,  1,  1,  1,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4, 50,  5,  5,
         29, 29, 29, 30,  0,  0,  0,  0,  0,  0,  0,  4,  5,  5,  5,
          0,  0, 40,  0,  0,  0,  0,  0,  0,  0,  0, 55,  5, 40,  5,
          0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  5,  5
        ],

        physicalMap: [
        //0       2       4       6       8      10      12
          0, 18, 58,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0, 18, 58,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0, 18, 58,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0, 18, 58,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 37, 39,
          0, 18,  0,  0,  0,  0, 47, 34,  0,  0,  0, 37, 39,  0,  0,
         16,  8,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4,  1,  1,  1,
          0,  0,  0,  0,  0,  0, 33, 33, 33,  0,  0, 44, 16, 42,  3,
         15, 36,  0,  0,  0,  0, 16, 16, 45,  0,  0,  0,  0,  0,  0,
          5,  0, 2, 24,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          5,  5,  0,  0, 15, 15, 15, 15, 15, 20,  0, 33, 33, 33, 33
        ],
        enemies: () => {
          return {
            // 1: new Helicopter(Helicopter.hel1([100, 25])),
            // 3: new Flower(Flower.flow2([250, 140])),
            3: new Jellyfish(Jellyfish.jell2([500, 550])),
            4: new Jellyfish(Jellyfish.jell1([700, 50])),
            5: new Vinehead(Vinehead.vine1([500, 100], this.player)),
            6: new Vinehead(Vinehead.vine3([800, 20], this.player)),

            // 4: new Flower(Flower.flow2([450, 140])),
          }
        },
        levelLayers: {
          background: "./assets/Level1/lvl3_back.png",
          mid: "./assets/Level1/lvl3_mid.png",
          front: "./assets/Level1/lvl3_front.png"
        },
      },
      4: {
        renderMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,
          0,  0,  0,  0,  0,  3,  1,  1,  1,  2,  0,  0,  0,  3,  5,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4, 28,
          1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
          9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 16, 16, 16, 16,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  3,  1,  1,  1,  2,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  5,  5,  5,  5,  5,  0,  1,  1,  1,  1
        ],
        physicalMap: [
          0,  0, 38, 39,  0,  0,  0, 42, 41, 39,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
         38, 39,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  2,
          0,  0,  0,  0,  0,  3,  1,  1,  1,  8,  0,  0,  0,  2,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
          9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  7,  7,  7,  7,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  3,  1,  1,  1,  2,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  9,  0,  0,  0, 10,  0,  1,  1,  1,  1
        ],
        enemies: () => {
          return {
            1: new Helicopter(Helicopter.hel2([500, 0])),
            // // 3: new Flower(Flower.flow2([290, 190])),
            4: new Vinehead(Vinehead.vine3([500, 100], this.player)),
            5: new Vinehead(Vinehead.vine3([300, 450], this.player)),
            6: new Vinehead(Vinehead.vine3([850, 500], this.player)),
            7: new Vinehead(Vinehead.vine1([800, -20], this.player)),
          }
          // 4: new Flower(Flower.flow2([530, 190])),

        }
      },
      5: {
        renderMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
         29, 29, 29, 29, 29, 29, 29,  0, 29, 29, 29, 29, 29, 29, 29,
          1,  1,  1,  1,  1,  1,  2,  0,  3,  1,  1,  1,  1,  1,  1,
          5,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 13,  5,  5,
         28,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  4, 28,
          1,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  3,  1,  1,  1,
         16, 16, 16,  0,  0,  0,  0,  0,  0,  0,  0,  5,  5,  5,  5,
          0,  0,  0,  0,  0, 29, 29, 29, 29, 29,  3,  1,  1,  1,  1,
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
        enemies: () => {
          return {
            1: new Vinehead(Vinehead.vine3([10, 530], this.player)),
            2: new Vinehead(Vinehead.vine3([830, 0], this.player)),
            3: new Vinehead(Vinehead.vine2([600, 600], this.player)),
            4: new Vinehead(Vinehead.vine1([500, 100], this.player)),
            5: new Vinehead(Vinehead.vine2([200, 450], this.player)),
            6: new Vinehead(Vinehead.vine2([850, 500], this.player)),
            7: new Vinehead(Vinehead.vine1([800, -20], this.player)),
          }
        }
      },
      6: {
        renderMap: [
          0,  0,  0,  0,  0,  0,  0, 13,  5,  5,  5, 49,  5,  5,  5,
          0,  0,  0,  0,  0,  0,  0,  0, 16, 16, 16, 16, 16, 16, 16,
          2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
         28,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          3,  1,  2,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
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
        enemies: () => {
          return {
            1: new BossVinehead(BossVinehead.boss1([650, 100], this.player))
          }
        },
        theme: "./assets/Sound/dk3_boss_boogie.mp3",
        levelLayers: {
          background: "./assets/Level1/lv1_back.png",
          // mid: "./assets/Level1/lv1_mid.png",
          // front: "./assets/Level1/lv1_front.png"
        }
      },


      8: {
        renderMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0, 29, 29, 29,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  3,  1,  2,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0, 29, 29, 29,  0,  0,  0, 29, 29, 29,  0,  0,  0,
          0,  0,  0,  3,  1,  2,  0,  0,  0,  3,  1,  2,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,        ],
        physicalMap: [
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  2,  2,  2,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  2,  2,  2,  0,  0,  0,  2,  2,  2,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          1,  1,  1,  2,  2,  2,  2,  2,  2,  2,  2,  1,  1,  1,  1
        ],
        enemies: () => {
          return {
            1: new Spider(Spider.spider2([600, 0], [20, 440])),

            // 1: new BossVinehead(BossVinehead.boss1([650, 100], this.player))
          }
        },
        theme: "./assets/Sound/dk3_boss_boogie.mp3",
        levelLayers: {
          background: "./assets/Level1/lv1_back.png",
          // mid: "./assets/Level1/lv1_mid.png",
          // front: "./assets/Level1/lv1_front.png"
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