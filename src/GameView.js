import Level from "./Levels/Level";
import Player from "./Player";
import Game from "./Game";
import GameHUD from "./GameHUD";


class GameView {
  constructor (canvas, ctx, ref) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.ref = ref;
    this.game = null;
    this.splash = new Image();
    this.splash.src = "./assets/firegirl.jpg";
    this.tipsScreen = new Image();
    this.tipsScreen.src = "./assets/tipsScreen.png";
    this.logo = new Image();
    this.logo.src = "./assets/firegirl_logo_dark.png";
    this.scoreFormOpen = false;
    this.tips = false;

    this.renderGame = this.renderGame.bind(this);
    this.newGame = this.newGame.bind(this);
    this.newEnemyRush = this.newEnemyRush.bind(this);
    this.renderScoreSubmission = this.renderScoreSubmission.bind(this);
    this.continueGame = this.continueGame.bind(this);

    window.addEventListener("keydown", (event) => {
      // event.preventDefault();
      if (this.scoreFormOpen) return;

      switch (event.key) {
        case "Enter": 
          if (!this.game || this.game.gameOver) {
            this.newGame();
          }
          break;
        case "s":
          if (!this.game || this.game.gameOver) {
            this.newEnemyRush();
          };
          break;
        case "t": 
          this.tips = !this.tips;
          break;
        case "m": 
          this.game.level.theme.mute();
          break;
        case "c":
          if (this.game.gameOver && !this.game.won) {
            this.continueGame();
          }
          break;
        default:
          return;
      }
    });
  }



  newGame(screen = null) {
    if (this.game) {
      this.game.level.theme.pause();
      this.game.level.theme = null;
    }
    if (!this.game || this.game.gameOver) {
      this.game = new Game(this.canvas, this.ctx, 1, screen);
      this.game.HUD = new GameHUD();
      this.game.level.theme.play();
    }
  }

  continueGame() {
    if (this.game.gameOver) {
      let startScreen = this.game.level.screen;
 
      this.game = null;
      this.game = new Game(this.canvas, this.ctx, 1);
      this.game.level.loadLevel(startScreen);
      this.game.enemies[startScreen] = this.game.level.enemies;
  

      this.game.player.x = 0;
      this.game.player.y = 0;
      this.game.player.setHit(0);
      this.game.player.damageMeter = 50;

      this.game.HUD = new GameHUD();
      this.game.level.theme.play();
    }
  }

  newEnemyRush() {
    if (this.game) {
      this.game.level.theme.pause();
      this.game.level.theme = null;
    }
    if (!this.game || this.game.gameOver) {
      this.game = new Game(this.canvas, this.ctx, "survivalMode");

      this.game.HUD = new GameHUD();
      this.game.level.theme.play();
    }
  }

  renderScoreSubmission() {
    let leaderboard = document.getElementById("leaderboard");

    if (
      leaderboard.length === 10 &&
      this.game.highScore < leaderboard.lastChild.getAttribute("data-score")
    )
      return;
    
    let canvasContainer = document.getElementById("canvas-container");

    let scoreForm = document.createElement("form");
    scoreForm.className = "highscore-form";
    let head1 = document.createElement("h3")
    head1.innerText = "New High Score!";
    let head2 = document.createElement("h4")
    head2.innerText = "-Enter your Name-";
    let input = document.createElement('input');
    input.setAttribute("type", "text");
    input.focus = "true";
    input.placeholder = "10 characters or less";
    let submit = document.createElement("input");
    submit.type = "submit";
    submit.className = "score-submit";
    submit.value = "Submit to Leaderboard";

    scoreForm.appendChild(head1);
    scoreForm.appendChild(head2);
    scoreForm.appendChild(input);
    scoreForm.appendChild(submit);

    
    canvasContainer.appendChild(scoreForm);
    scoreForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let error = document.createElement('div');
      error.innerHTML = "Name must be 10 characters or less";

      let name = e.currentTarget.childNodes[2].value;
      let score = this.game.highScore;
      if (name.length > 10 || name.length === 0) {
        e.currentTarget.insertBefore(error, e.currentTarget.childNodes[3]);
        return;
      } else {
        this.ref.push().set({
          name: name,
          score: score
        });
        this.game = null;
        this.scoreFormOpen = false;
        scoreForm.remove();

      }
    })
  }


  renderGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.game) {
      if (this.tips) {
        this.ctx.drawImage(
          this.tipsScreen,
          0,
          0,
          830,
          554,
          0, 0,
          this.canvas.width, this.canvas.height
        );

        this.ctx.font = "1.8em Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press T to Go Back", this.canvas.width / 2, 40);
      } else {

        this.ctx.drawImage(
            this.splash,
            0,
            0,
            920,
            644,
            0, 0,
            this.canvas.width, this.canvas.height
            );
      
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
            this.ctx.fillText("Press S to Play Survival Mode", this.canvas.width / 2, this.canvas.height * (7/9));

            this.ctx.font = "1.8em Arial";
            this.ctx.fillStyle = "pink";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Press T for Tips", this.canvas.width / 2, this.canvas.height * (8/9));
      }

    }

    if (this.game) {

      this.game.runGame();

      if (this.game.gameOver && this.game.lvl === "survivalMode" && !this.scoreFormOpen) {
        this.scoreFormOpen = true;
        setTimeout(() => {
          this.renderScoreSubmission();
        }, 1000);
      }
      
    }

    window.requestAnimationFrame(this.renderGame);
  }




} 



export default GameView;

