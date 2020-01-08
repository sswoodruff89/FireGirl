import Player from "./Player";
import Level from "./Levels/Level";
import Tile from "./Objects/Platforms/Tile";
import Collision from "./util/Collision";
import Controller from "./util/Controller";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};


class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = new Player(this.ctx, this.canvas);
    this.controller = new Controller(this.player);
    this.level = new Level({ 
      // canvas: canvas, 
      // ctx: ctx, 
      renderMap: Game.map1,
      physicalMap: Game.physicalMap1 
    });
    this.physicalMap = this.level.physicalMap;
    this.tileSize = this.level.tileSize;
    this.collider = new Collision();

    // this.getPlayerTilePos = this.getPlayerTilePos.bind(this);
    this.getTopLeftPos = this.getTopLeftPos.bind(this);
    this.getTopRightPos = this.getTopRightPos.bind(this);
    this.getBottomLeftPos = this.getBottomLeftPos.bind(this);
    this.getBottomRightPos = this.getBottomRightPos.bind(this);
    this.playerPlatformCheck = this.playerPlatformCheck.bind(this);
    this.playerUpdate = this.playerUpdate.bind(this);
    this.runGame = this.runGame.bind(this);
  }


  getTopLeftPos() {
    let x = Math.floor(this.player.leftSide() / this.tileSize);
    let y = Math.floor(this.player.topSide() / this.tileSize);
    return [x, y];
  }
  getTopRightPos() {
    let x = Math.floor(this.player.rightSide() / this.tileSize);
    let y = Math.floor(this.player.topSide() / this.tileSize);
    return [x, y];
  }
  getBottomLeftPos() {
    let x = Math.floor(this.player.leftSide() / this.tileSize);
    let y = Math.floor(this.player.bottomSide() / this.tileSize);
    return [x, y];
  }
  getBottomRightPos() {
    let x = Math.floor(this.player.rightSide() / this.tileSize);
    let y = Math.floor(this.player.bottomSide() / this.tileSize);
    return [x, y];
  }


  playerPlatformCheck() {
    let colVal;
    let top;
    let bottom;
    let right;
    let left;
    let cols = 15;
    let rows = 10;

    debugger
    [left, top] = this.getTopLeftPos();
    // left = Math.floor(left);
    // top = Math.floor(top);
    colVal = this.physicalMap[top * cols + left];
    this.collider.collidePlatform(
      this.player,
      left * this.tileSize,
      top * this.tileSize,
      colVal    
    );

    // debugger
    [right, top] = this.getTopRightPos();
    // right = Math.floor(right);
    // top = Math.floor(top);
    colVal = this.physicalMap[top * cols + right];
    this.collider.collidePlatform(
      this.player,
      right * this.tileSize,
      top * this.tileSize,
      colVal    
    );

    [left, bottom] = this.getBottomLeftPos();
    // left = Math.floor(left);
    // bottom = Math.floor(bottom);
    colVal = this.physicalMap[bottom * cols + left];
    this.collider.collidePlatform(
      this.player,
      left * this.tileSize,
      bottom * this.tileSize,
      colVal    
    );


    [right, bottom] = this.getBottomRightPos();
    // right = Math.floor(right);
    // bottom = Math.floor(bottom);
    colVal = this.physicalMap[bottom * cols + right];
    this.collider.collidePlatform(
      this.player,
      right * this.tileSize,
      bottom * this.tileSize,
      colVal
    );


    }
    // if (topLeft[0] - 1 >= 0 && topLeft[1] >= 0) {
    //   colVal = this.physicalMap[topLeft[0]-1][topLeft[1]];
    //   this.collider.collidePlatform(this.player, topLeft, colVal, this.level);
    // }
    
    // let topRight = this.getTopRightPos();
    // if (topRight[0] + 1 < rows && topRight[1] >= 0) {
    //   colVal = this.physicalMap[topLeft[0] + 1][topLeft[1]];
    //   this.collider.collidePlatform(this.player, topRight, colVal, this.level);
    // }

    // let bottomLeft = this.getBottomLeftPos();
    // if (bottomLeft[0] >= 0 && bottomLeft[1] + 1 < cols) {
    //   colVal = this.physicalMap[bottomLeft[0]][bottomLeft[1]+1];
    //   this.collider.collidePlatform(
    //     this.player,
    //     bottomLeft,
    //     colVal,
    //     this.level
    //   );
    // }

    // let bottomRight = this.getBottomRightPos();
    // if (topLeft[0] - 1 >= 0 && topLeft[1] < rows) {
    //   colVal = this.physicalMap[bottomLeft[0]][bottomLeft[1] + 1];

    //   this.collider.collidePlatform(
    //     this.player,
    //     bottomRight,
    //     colVal,
    //     this.level
    //   );
    // }

  

  playerUpdate() {
    this.player.whichDirection();

    // this.player.collider.collidePlayer(this, this.player.canvas);

    this.player.setOldPos();

    if (!this.player.isIdle()) {
      this.player.x += this.player.velX;
      // this.player.y += this.player.velY;

      if (this.player.direction === "right") {
        if (this.player.onGround && !this.player.keydown) {
          this.player.velX < 1 ? (this.player.velX = 0) : (this.player.velX /= CONSTANTS.FRICTION);
        }
      } else {
        if (this.player.onGround && !this.player.keydown) {
          this.player.velX > -1 ? (this.player.velX = 0) : (this.player.velX /= CONSTANTS.FRICTION);
        }
      }
    }

    this.player.inAir();
    this.collider.collidePlayer(this.player, this.canvas);
    this.playerPlatformCheck();
  }

  runGame() {
    this.level.drawLevel(this.ctx);
    this.player.drawPlayer();
    this.playerUpdate();
    // this.player.move();
    // this.collider.collidePlayer(this.player, this.canvas);
    // this.playerPlatformCheck();
  }



}



Game.map1 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1
];
// Game.map1 = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];


Game.physicalMap1 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1
];
// Game.physicalMap1 = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 3, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 4, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];
export default Game;