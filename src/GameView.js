import Controller from "./util/Controller";
import Level from "./Levels/Level";
import Player from "./Player";
import Game from "./Game";



class GameView {
  constructor (canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.game = new Game(this.canvas, this.ctx);


    this.renderGame = this.renderGame.bind(this);

  }

  renderGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.game.level.drawLevel();
    // this.game.player.drawPlayer();
    // this.game.player.move();
    // console.log(this.game.getPlayerTilePos());
    console.log("===================");
        console.log(this.game.getBottomLeftPos());
        console.log(this.game.getTopLeftPos());
        console.log(this.game.getBottomRightPos());
        console.log(this.game.getTopRightPos());
        // console.log(this.game.level.cols)
    this.game.runGame();
    window.requestAnimationFrame(this.renderGame);
  }

  // drawBackground() {
  //   this.ctx.fillStyle = "Green";
  //   this.ctx.rect(0, 0, this.ctx.width, this.ctx.height);
  // }
  // draw() {
  //   this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
  //   this.player.drawPlayer(this.ctx);
  // }
  




} 



export default GameView;

