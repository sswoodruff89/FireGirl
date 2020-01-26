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
    this.logo = new Image();
    this.logo.src = "./assets/firegirl_logo_dark.png";


    this.renderGame = this.renderGame.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.newGame = this.newGame.bind(this);
    this.newEnemyRush = this.newEnemyRush.bind(this);

    window.addEventListener("keydown", (event) => {
      event.preventDefault();
      switch (event.key) {
        case "Enter": 
          if (!this.game || this.game.gameOver) {
            this.newGame();
          }
          break;
        case " ":
          if (!this.game || this.game.gameOver) {
            this.newEnemyRush();
          };
          break;
        case "m": 
          this.game.level.theme.mute();
          break;
        default:
          return;
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
      this.game.HUD = new GameHUD();
      this.game.level.theme.play();
    }
  }

  newEnemyRush() {
    if (!this.game || this.game.gameOver) {
      this.game = new Game(this.canvas, this.ctx, 2);
      // this.game.newLevel();
      // this.game.level = new Level({
      //   ctx: this.ctx,
      //   mapKeys: Level.level2(),
      //   player: this.game.player,
      //   tileSize: this.game.tileSize
      // });
      this.game.HUD = new GameHUD();
      this.game.level.theme.play();
    }
    // if (!this.game || this.game.gameOver) {
    //   this.game = new Game(this.canvas, this.ctx);
    //   this.game.level.loadLevel(8);
    //   this.game.level.enemiesInterval();
    //   this.game.HUD = new GameHUD();
    //   this.game.level.theme.play();
    // }
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
          this.canvas.width, this.canvas.height
      );

      // this.ctx.font = "100px Arial";
      // this.ctx.fillStyle = "rgb(46, 2, 2)";
      // this.ctx.textAlign = "center";
      // this.ctx.fillText("FIRE GIRL", this.canvas.width / 2, this.canvas.height / 3);
      // this.ctx.filter = "brightness(50%)";
      this.ctx.drawImage(
        this.logo,
        0,
        0,
        636,
        171,
        this.canvas.width / 6,
        this.canvas.height / 5,
        636,
        171
      );
      this.ctx.font = "1.8em Arial";
      this.ctx.fillStyle = "pink";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Press Enter to Play Level 1", this.canvas.width / 2, this.canvas.height * (2/3));

      this.ctx.font = "1.8em Arial";
      this.ctx.fillStyle = "pink";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Press Space to Play Survival Mode", this.canvas.width / 2, this.canvas.height * (7/9));
    }

    if (this.game) {

      this.game.runGame();
      
    }

    window.requestAnimationFrame(this.renderGame);
  }




} 



export default GameView;

