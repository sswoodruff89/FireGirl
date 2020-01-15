import Player from "./Player";
import Level from "./Levels/Level";
import Tile from "./Objects/Platforms/Tile";
import Collision from "./util/Collision";
import Controller from "./util/Controller";
import Enemy from "./Objects/Enemies/Enemy";
import Helicopter from "./Objects/Enemies/Helicopter";
import Flower from "./Objects/Enemies/Flower";
import GameHUD from "./GameHUD";

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
    this.tileSize = this.canvas.width / 15;
    this.level = new Level({ 
      ctx: ctx,
      mapKeys: Level.level1(),
      player: this.player,
      tileSize: this.tileSize
    });
    // this.physicalMap = this.level.physicalMap;
    this.collider = new Collision(this.tileSize);
    this.HUD = new GameHUD();
    this.frameCount = 0;
    this.enemies = this.level.enemies;
    this.gameOver = false;
    this.embers = new Image();
    this.embers.src = "./assets/embers.jpg";
    // this.getPlayerTilePos = this.getPlayerTilePos.bind(this);

    this.getTopLeftPos = this.getTopLeftPos.bind(this);
    this.getTopRightPos = this.getTopRightPos.bind(this);
    this.getBottomLeftPos = this.getBottomLeftPos.bind(this);
    this.getBottomRightPos = this.getBottomRightPos.bind(this);
    this.playerPlatformCheck = this.playerPlatformCheck.bind(this);
    this.playerUpdate = this.playerUpdate.bind(this);
    this.projectilePlatformCheck = this.projectilePlatformCheck.bind(this);
    this.renderFireballs = this.renderFireballs.bind(this);
    this.renderEnemies = this.renderEnemies.bind(this);
    this.renderEnemyProjectiles = this.renderEnemyProjectiles.bind(this);
    this.startFrameCount = this.startFrameCount.bind(this);
    this.runGame = this.runGame.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
    this.win = this.win.bind(this);
    this.enemiesCleared = this.enemiesCleared.bind(this);
    this.loadLevel = this.loadLevel.bind(this);
    this.resizeGame = this.resizeGame.bind(this);

    this.enemyCount = Object.keys(this.enemies).length;
    this.cleared = false;

    this.startFrameCount();
  }

  startFrameCount() {
    this.frameInterval = setInterval(() => {
      this.frameCount++;
    }, (1000 / 30));
  }

  resizeGame(canvas) {
    this.tileSize = canvas.width / 15;
    this.level.tileSize = this.tileSize;
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


  enemiesCleared() {
    if (Object.keys(this.enemies).length === 0) {
      this.cleared = true;
      return true;
    }else {
      return false;
    }
  }

  playerPlatformCheck() {
    let colVal;
    let top;
    let bottom;
    let right;
    let left;
    let cols = 15;
    let rows = 10;
    let floorCount = 0;
    let climbCount = 0;

    let physMap = this.level.physicalMap;

    [left, top] = this.getTopLeftPos();
    colVal = physMap[top * cols + left];
    colVal === 33 ? floorCount++ : "";
    this.collider.collidePlatform(
      this.player,
      left * this.tileSize,
      top * this.tileSize,
      colVal, 
      this.tileSize    
    );

    [right, top] = this.getTopRightPos();
    colVal = physMap[top * cols + right];
    colVal === 33 ? floorCount++ : "";

    this.collider.collidePlatform(
      this.player,
      right * this.tileSize,
      top * this.tileSize,
      colVal,
      this.tileSize
    );

    [left, bottom] = this.getBottomLeftPos();
    colVal = physMap[bottom * cols + left];
    (colVal === 0) ? floorCount++ : "";
    colVal === 33 ? floorCount++ : "";
    this.collider.collidePlatform(
      this.player,
      left * this.tileSize,
      bottom * this.tileSize,
      colVal,
      this.tileSize
    );


    [right, bottom] = this.getBottomRightPos();
    colVal = physMap[bottom * cols + right];
    (colVal === 0) ? floorCount++ : "";
    colVal === 33 ? floorCount++ : "";
    if (this.player.canClimb && climbCount === 0) this.player.canClimb = false;
    if (floorCount === 2) {
      this.player.onGround = false;
      // if (this.player.jumpCount === 2) this.player.jumpCount -=;
    }
    this.collider.collidePlatform(
      this.player,
      right * this.tileSize,
      bottom * this.tileSize,
      colVal,
      this.tileSize
    );
  }


  projectilePlatformCheck(projectile) {
    let colVal;
    let top;
    let bottom;
    let right;
    let left;
    let cols = 15;
    let physMap = this.level.physicalMap;

    if (projectile.dir === "left") {
      [left, top] = projectile.getTopLeftPos();
      colVal = physMap[top * cols + left];
      this.collider.collidePlatform(
        projectile,
        left * this.tileSize,
        top * this.tileSize,
        colVal,
        this.tileSize
      );

      [left, bottom] = projectile.getBottomLeftPos();
      colVal = physMap[bottom * cols + left];
      this.collider.collidePlatform(
        projectile,
        left * this.tileSize,
        bottom * this.tileSize,
        colVal,
        this.tileSize
      );
    }

    if (projectile.dir === "right") {
      [right, top] = projectile.getTopRightPos();
      colVal = physMap[top * cols + right];
      this.collider.collidePlatform(
        projectile,
        right * this.tileSize,
        top * this.tileSize,
        colVal,
        this.tileSize
      );

      [right, bottom] = projectile.getBottomRightPos();
      colVal = physMap[bottom * cols + right];

      this.collider.collidePlatform(
        projectile,
        right * this.tileSize,
        bottom * this.tileSize,
        colVal,
        this.tileSize
      );

    }

  }
  

  playerUpdate() {
    this.player.setRunning();
    this.player.isIdle();
    this.player.setOldPos();

    if (!this.player.idle) {
      
      // if (this.player.direction === "right") {
      //   if (this.player.onGround && !this.player.keydown) {
      //     this.player.velX < 1 ? (this.player.velX = 0) : (this.player.velX /= CONSTANTS.FRICTION);
      //   }
      // } else if (this.player.direction === "left") {
      //   if (this.player.onGround && !this.player.keydown) {
      //     this.player.velX > -1 ? (this.player.velX = 0) : (this.player.velX /= CONSTANTS.FRICTION);
      //   }
      // }
      this.player.x += this.player.velX;
    }

    if (this.player.climbing) {
        this.player.isClimbing();
    } else {
        this.player.inAir();

    }

    this.collider.collidePlayer(this.player, this.canvas, this.cleared);
    this.playerPlatformCheck();
  }

  renderEnemies() {
    if (this.level.screen === 6) {
      this.enemyCount = Object.keys(this.level.enemies).length;
    }
    
    if (!this.cleared) {
      for (let key in this.enemies) {
        if (this.enemies[key].dying && !this.enemies[key].dead) continue;
        this.projectilePlatformCheck(this.enemies[key]);

        if (!this.enemies[key].dead) {
          this.enemies[key].move(this.canvas, this.player.x, this.player.y);
          this.collider.collideEnemy(this.player, this.enemies[key]);
          this.enemies[key].drawEnemy(this.ctx, this.frameCount);

        } else {
          delete this.enemies[key];
          this.enemyCount -= 1;
        }
      }
      this.enemiesCleared();
    }
  }

  renderFireballs() {
    if (Object.keys(this.player.fireballs).length !== 0) {
      for (let key in this.player.fireballs) {
        let fireball = this.player.fireballs[key];
        
        if (this.enemyCount !== 0) {
          for (let key in this.enemies) {
            this.collider.collideEnemy(fireball, this.enemies[key]);
          }
        }
        
        this.projectilePlatformCheck(fireball);

        (!fireball.isHit) ? 
          fireball.drawProjectile(this.ctx, this.frameCount) :
          delete this.player.fireballs[key];
      }
    }
  }

  renderEnemyProjectiles() {
    ///Check if any enemies
    Object.values(this.enemies).forEach((enemy) => {
      if (Object.keys(enemy.projectiles).length !== 0) {
        for (let key in enemy.projectiles) {
          this.collider.collideProjectile(this.player, enemy.projectiles[key]);

          this.projectilePlatformCheck(enemy.projectiles[key]);

          (!enemy.projectiles[key].isHit) ?
            enemy.projectiles[key].drawProjectile(this.ctx, this.frameCount) :
            delete enemy.projectiles[key];
        }
      }
    });
  }

  loadLevel() {
    // debugger
    if (((this.player.x + (this.player.width / 2)) >= this.canvas.width)) {
      this.level.loadLevel(1);
      this.cleared = false;
      this.enemies = this.level.enemies;
      this.enemyCount = Object.keys(this.enemies);
      this.player.x = 0;
    } else if ((this.player.x + (this.player.width / 2)) <= 0) {
      this.level.loadLevel(-1);
      this.player.x = this.canvas.width - this.player.width;
    }
  }

  isGameOver() {
    this.win();
    this.gameOver = (this.player.dead || this.won) ? true : false;
  }

  //refactor
  win() {
    this.won = (this.level.screen === 6 && Object.keys(this.enemies).length === 0) ? true : false;
  }
  

  runGame() {
    this.isGameOver();

    if (!this.gameOver) {
      this.loadLevel();
      this.level.renderBackground(this.ctx, this.canvas);
      if (this.level.screen > 3) this.level.drawLevel(this.ctx);
      this.player.drawPlayer(this.frameCount);
      this.playerUpdate();
      if (this.level.screen < 4) {
        this.level.renderMid(this.ctx, this.canvas);
        this.level.renderFront(this.ctx, this.canvas);
      }


      // this.enemies[1].drawEnemy(this.ctx, this.frameCount);
      this.renderEnemies();
      // this.enemies[1].callAttack(this.frameCount);
      
      this.renderEnemyProjectiles();
      this.renderFireballs();
      
      this.HUD.drawHUD(this.canvas, this.ctx, this.player, this.frameCount);

    } else {
      if (!this.won) {
        this.level.theme.pause();
        // this.ctx.beginPath();
        // this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.fillStyle = "rgba(255, 255, 255, .1)";
        // this.ctx.fill();
        // this.ctx.closePath();

        // // let img = new Image();
        // // img.src = "./assets/embers.jpg";
        // // img.onload = () => {
        //   // ctx.drawImage(img, 0, 0);
            this.ctx.drawImage(
                this.embers,
                0,
                0,
                852,
                400,
                0, 0,
                900, 600
          );
        // };
  
        this.ctx.font = "130px Arial";
        this.ctx.fillStyle = "rgb(46, 2, 2)";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2);


        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press Enter to Play Again", this.canvas.width / 2, 400);

      } else {
        this.level.theme.pause();

        this.ctx.drawImage(
          this.embers,
          0,
          0,
          852,
          400,
          0, 0,
          900, 600
        );
        this.ctx.font = "80px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText("CONGRATS!", this.canvas.width / 2, 160);


        this.ctx.font = "80px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText("YOU BEAT LEVEL 1", this.canvas.width / 2, this.canvas.height / 2);


        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press Enter to Play Again", this.canvas.width / 2, 400);
      }

    } 
    
  }

}



export default Game;