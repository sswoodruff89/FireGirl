import Controller from "./util/Controller";
import Level from "./Levels/Level";
import Player from "./Player";

let map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

class GameView {
  constructor (canvas, ctx) {
    // this.stage = new createjs.Stage("gameCanvas");
    this.canvas = canvas;
    this.ctx = ctx;
    // this.circle = new createjs.Shape();
    this.player = new Player(ctx);
    // this.playerModel = this.player.model;
    this.controller = new Controller(this.player);

    this.runGame = this.runGame.bind(this);

  }

  runGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.drawPlayer();
    this.player.move();
    window.requestAnimationFrame(this.runGame);
  }

  // drawBackground() {
  //   this.ctx.fillStyle = "Green";
  //   this.ctx.rect(0, 0, this.ctx.width, this.ctx.height);
  // }
  // draw() {
  //   this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
  //   this.player.drawPlayer(this.ctx);
  // }
  
  // handleTick(event) {
  //   this.player.move();

  //   if (this.playerModel.x > this.stage.canvas.width) { this.playerModel.x = 0; }
  //   if (this.playerModel.x < 0) { this.playerModel.x = this.stage.canvas.width; }
  //   if (this.playerModel.y < 0) { this.playerModel.y = this.stage.canvas.height; }
  //   if (this.playerModel.y > this.stage.canvas.height) { this.playerModel.y = 0; }
  //   this.stage.update();
  // }



} 

export default GameView;

