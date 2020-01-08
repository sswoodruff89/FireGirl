import Player from "./Player";
import Level from "./Levels/Level";
import Tile from "./Objects/Platforms/Tile";
import Collision from "./util/Collision";
import Controller from "./util/Controller";



class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = new Player(this.ctx, this.canvas);
    this.controller = new Controller(this.player);
    this.level = new Level({ 
      canvas: canvas, 
      ctx: ctx, 
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
    this.runGame = this.runGame.bind(this);
  }



  getTopLeftPos() {
    let x = Math.floor(this.player.leftSide() / this.level.tileSize);
    let y = Math.floor(this.player.topSide() / this.level.tileSize);
    return [x, y];
  }
  getTopRightPos() {
    let x = Math.floor(this.player.rightSide() / this.level.tileSize);
    let y = Math.floor(this.player.topSide() / this.level.tileSize);
    return [x, y];
  }
  getBottomLeftPos() {
    let x = Math.floor(this.player.leftSide() / this.level.tileSize);
    let y = Math.floor(this.player.bottomSide() / this.level.tileSize);
    return [x, y];
  }
  getBottomRightPos() {
    let x = Math.floor(this.player.rightSide() / this.level.tileSize);
    let y = Math.floor(this.player.bottomSide() / this.level.tileSize);
    return [x, y];
  }


  playerPlatformCheck() {
    let colVal;
    let cols = 15;
    let rows = 10;
    // debugger
    let topLeft = this.getTopLeftPos();

    if (topLeft[0] - 1 >= 0 && topLeft[1] >= 0) {
      colVal = this.level.physicalMap[topLeft[0]-1][topLeft[1]];
      this.collider.collidePlatform(this.player, topLeft, colVal, this.level);
    }
    
    let topRight = this.getTopRightPos();
    if (topRight[0] + 1 < rows && topRight[1] >= 0) {
      colVal = this.level.physicalMap[topLeft[0] + 1][topLeft[1]];
      this.collider.collidePlatform(this.player, topRight, colVal, this.level);
    }

    let bottomLeft = this.getBottomLeftPos();
    if (bottomLeft[0] >= 0 && bottomLeft[1] + 1 < cols) {
      colVal = this.level.physicalMap[bottomLeft[0]][bottomLeft[1]+1];
      this.collider.collidePlatform(
        this.player,
        bottomLeft,
        colVal,
        this.level
      );
    }

    let bottomRight = this.getBottomRightPos();
    if (topLeft[0] - 1 >= 0 && topLeft[1] < rows) {
      colVal = this.level.physicalMap[bottomLeft[0]][bottomLeft[1] + 1];

      this.collider.collidePlatform(
        this.player,
        bottomRight,
        colVal,
        this.level
      );
    }

  }

  playerUpdate() {

  }

  runGame() {
    this.level.drawLevel();
    this.player.drawPlayer();
    this.player.move();
    this.collider.collidePlayer(this.player, this.canvas);
    this.playerPlatformCheck();
  }



}



Game.map1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

Game.physicalMap1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 4, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export default Game;