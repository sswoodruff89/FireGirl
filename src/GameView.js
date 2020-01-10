import Controller from "./util/Controller";
import Level from "./Levels/Level";
import Player from "./Player";
import Game from "./Game";
import GameHUD from "./GameHUD";



class GameView {
  constructor (canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    // this.game = new Game(this.canvas, this.ctx);
    this.game = null;
    this.splash = new Image();
    this.splash.src = "./assets/firegirl.jpg";
    // this.HUD = new GameHUD();
    // this.tileMap = this.loadImage();


    this.renderGame = this.renderGame.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.newGame = this.newGame.bind(this);

    window.addEventListener("keydown", (event) => {
      if (!this.game || this.game.gameOver && event.keyCode === 13) {
        this.newGame();

      }
    });
  }

  loadImage() {
    let tileMap = new Image();
    tileMap.src = "./assets/tileGen.png";
    return tileMap;
  }

  newGame() {
    if (!this.game || this.game.gameOver) {
      this.game = new Game(this.canvas, this.ctx);
    }
  }

  renderGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.game) {
        this.ctx.drawImage(
            this.splash,
            0,
            0,
            920,
            644,
            0, 0,
            900, 600
        );

      this.ctx.font = "150px Arial";
      this.ctx.fillStyle = "rgb(46, 2, 2)";
      this.ctx.textAlign = "center";
      this.ctx.fillText("FIRE GIRL", this.canvas.width / 2, 230);

      this.ctx.font = "60px Arial";
      this.ctx.fillStyle = "pink";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Press Enter to Play", this.canvas.width / 2, 350);
    }
    // if (this.game.isGameOver()) {
    //   this.ctx.beginPath();
    //   this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    //   this.ctx.fillStyle = "rgba(255, 255, 255, .1)";
    //   this.ctx.fill();
    //   this.ctx.closePath();

    //   this.ctx.font = "130px Arial";
    //   this.ctx.fillStyle = "red";
    //   this.ctx.textAlign = "center";
    //   this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2);
    // }
    // this.game.level.drawLevel();
    // this.game.player.drawPlayer();
    // this.game.player.move();
    // console.log(this.game.getPlayerTilePos());
    // console.log("===================");
    //     console.log(this.game.getBottomLeftPos());
    //     console.log(this.game.getTopLeftPos());
    //     console.log(this.game.getBottomRightPos());
    //     console.log(this.game.getTopRightPos());
        // console.log(this.game.level.cols)
    if (this.game) {

      this.game.runGame();
      
    }

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

