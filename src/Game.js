import Player from "./Player";
import Level from "./Levels/Level";
import Tile from "./Objects/Platforms/Tile";
import Collision from "./util/Collision";
import Controller from "./util/Controller";
import Enemy from "./Objects/Enemies/Enemy";
import Helicopter from "./Objects/Enemies/Helicopter";
import Flower from "./Objects/Enemies/Flower";
import Item from "./Objects/Items/Item";
import GameHUD from "./GameHUD";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};


class Game {
  constructor(canvas, ctx, lvl = 1) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.lvl = lvl;
    this.levelCall = {
      1: Level.level1(),
      2: Level.level2()
    }
    this.player = new Player(this.ctx, this.canvas);
    this.controller = new Controller(this.player, this);
    this.tileSize = canvas.width / 15;
    this.level = new Level({ 
      ctx: ctx,
      mapKeys: this.levelCall[lvl],
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

    this.highScore = 0;
    this.killCount = 0;
    this.pause = false;

    this.getTopLeftPos = this.getTopLeftPos.bind(this);
    this.getTopRightPos = this.getTopRightPos.bind(this);
    this.getBottomLeftPos = this.getBottomLeftPos.bind(this);
    this.getBottomRightPos = this.getBottomRightPos.bind(this);
    this.playerPlatformCheck = this.playerPlatformCheck.bind(this);
    this.playerUpdate = this.playerUpdate.bind(this);
    this.projectilePlatformCheck = this.projectilePlatformCheck.bind(this);
    this.renderItems = this.renderItems.bind(this);
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
    this.newLevel = this.newLevel.bind(this);
    this.spawnItems = this.spawnItems.bind(this);
    this.renderPause = this.renderPause.bind(this);

    this.enemyCount = Object.keys(this.enemies).length;
    this.cleared = false;

    this.survivalMode = this.survivalMode.bind(this);

    this.startFrameCount();
  }

  startFrameCount() {
    this.frameInterval = setInterval(() => {
      this.frameCount++;
    }, (1000 / 30));
  }


  newLevel() {
    this.level = new Level({
      ctx: this.ctx,
      mapKeys: Level.level2(),
      player: this.player,
      tileSize: this.tileSize
    });
    this.renderMap = this.level.mapKeys[this.level.screen].renderMap;
    this.physicalMap = this.level.mapKeys[this.level.screen].physicalMap;
    this.enemies = this.level.enemies();
    this.level.enemiesInterval();
    // this.level.loadLevel(8);
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
    if (parseInt(this.level.screen) === 8) return;
    if (Object.keys(this.enemies).length === 0) {
      this.cleared = true;
      return true;
    } else {
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
    colVal === 58 ? climbCount++ : "";
    this.collider.collidePlatform(
      this.player,
      left * this.tileSize,
      top * this.tileSize,
      colVal, 
      this.tileSize    
    );

    [right, top] = this.getTopRightPos();
    colVal = physMap[top * cols + right];
    colVal === 58 ? climbCount++ : "";

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
    colVal === 58 ? climbCount++ : "";
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
    colVal === 58 ? climbCount++ : "";
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
      // if (this.player.velX > 7 || this.player.velX < -7) {
      //   if (this.player.keydown)
      //   this.player.velX += (this.player.velX > 0) ? -1 : 1;
      // } else {
      //   this.player.dash = false;
      // }

      // if (this.player.runningKeyDown && this.player.dashing) {
      //   if (this.player.velX > 7 || this.player.velX < -7) {
      //     this.player.velX += (this.player.velX > 0) ? -1 : 1;
      //   }

      // } else if (this.player.onGround && this.player.dashing && !this.player.runningKeyDown) {
      //   this.player.velX += (this.player.velX > 0) ? -1 : (this.player.velX < 0) ? 1 : 0;
      // }
      // if (this.player.direction === "right") {
      //   if ((this.player.onGround && !this.player.keydown && this.player.velX > 0)) {
      //     this.player.velX -= 1;
      //     // this.player.velX < 1 ? (this.player.velX = 0) : (this.player.velX /= CONSTANTS.FRICTION);
      //   }
      // } else if (this.player.direction === "left") {
      //   if ((this.player.onGround && !this.player.keydown && this.player.velX > 0)) {
      //     this.player.velX += 1;
      //   }
      // }
      this.player.x += this.player.velX;
      // this.player.isDashing();
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
    // if (this.level.screen === 6 || this.level.screen === 8) {
      this.enemyCount = Object.keys(this.level.enemies).length;
    // } 
    // else if (this.level.screen = 8) {
    //   this.enemyCount = 100;
    // }

    if (!this.cleared) {
      for (let key in this.enemies) {
        // if (this.enemies[key].dying && !this.enemies[key].dead) continue;
        this.projectilePlatformCheck(this.enemies[key]);

        if (!this.enemies[key].dead) {
          this.enemies[key].drawEnemy(this.ctx, this.frameCount);
          this.collider.collideEnemy(this.player, this.enemies[key]);
          this.enemies[key].move(this.canvas, this.player, this.ctx);

        } else {
          this.player.damageMeter += (this.enemies[key].points / 2);
          this.highScore += this.enemies[key].points;
          this.killCount++;
          if (this.killCount % 22 === 0) {
            this.spawnItems([this.enemies[key].x, this.enemies[key].y]);
          }

          delete this.enemies[key];
          this.enemyCount -= 1;
        }
      }
      this.enemiesCleared();
    }
  }

  spawnItems(pos) {
    this.level.items[100] = new Item(Item.health(pos, true));
  }

  renderItems() {
      if (Object.keys(this.level.items).length === 0) return;

      for (let key in this.level.items) {
        this.level.items[key].checkCollected(this.player);
        if (!this.level.items[key].collected) {
          this.level.items[key].drawItem(this.ctx, this.frameCount);
        } else {
          delete this.level.items[key];
        }
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

  renderPause() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.fill();
    this.ctx.closePath();


    this.ctx.font = "1.8em Arial";
    this.ctx.fillStyle = "pink";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Paused",
      this.canvas.width / 2,
      this.canvas.height / 2
    );

  }

  loadLevel() {
    if (((this.player.x + (this.player.width / 2)) >= this.canvas.width)) {
      if (this.level.screen === parseInt(this.level.lastScreen)) {
        this.won = true;
        return;
      } else {
        this.level.loadLevel(parseInt(this.level.screen) + 1);
        this.cleared = false;
        this.enemies = this.level.enemies;
        this.enemyCount = Object.keys(this.enemies);
        this.player.x = 0 - this.player.width / 3;
      }
    } else if ((this.player.x + (this.player.width / 2)) <= 0) {
      this.level.loadLevel(-1);
      this.player.x = this.canvas.width - this.player.width;
    }
  }

  survivalMode() {
    if (this.level.screen !== "8") return;

    if (this.level.rushLevel === 0) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(6000, 6);
    } else if (this.highScore > 30 && this.level.rushLevel === 1) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(5000, 7);
    } else if (this.highScore > 60 && this.level.rushLevel === 2) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(4500, 7);
    } else if (this.highScore > 100 && this.level.rushLevel === 3) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(4000, 8);
    } else if (this.highScore > 140 && this.level.rushLevel === 4) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(3500, 8);
    } else if (this.highScore > 180 && this.level.rushLevel === 5) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(3000, 8);
    } else if (this.highScore > 220 && this.level.rushLevel === 6) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(2500, 9);
    } else if (this.highScore > 260 && this.level.rushLevel === 7) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(2000, 9);
    }
  }

  isGameOver() {
    // this.win();
    this.gameOver = (this.player.dead || this.won) ? true : false;
  }

  //refactor
  win() {
    // this.won = (this.level.screen === 6 && Object.keys(this.enemies).length === 0) ? true : false;
  }
  

  runGame() {
    if (this.pause) {
      this.renderPause();
      return;
    }
    this.loadLevel();
    this.isGameOver();
    
    if (!this.gameOver) {
      this.level.renderBackground(this.ctx, this.canvas);
      if (this.level.screen > 5) this.level.drawLevel(this.ctx);
      this.player.drawSprite(this.frameCount);
      // this.player.drawPlayer(this.frameCount);
      this.playerUpdate();
      if (this.level.screen < 6) {
        this.level.renderMid(this.ctx, this.canvas);
      }
      this.survivalMode(this.level, this.highScore);

      // this.enemies[1].drawEnemy(this.ctx, this.frameCount);
      this.renderEnemies();
      // this.enemies[1].callAttack(this.frameCount);
      this.renderItems();
      this.renderEnemyProjectiles();
      this.renderFireballs();
      if (this.level.screen < 6) {
        this.level.renderFront(this.ctx, this.canvas);
      }
      
      this.HUD.drawHUD(this.canvas, this.ctx, this.player, this.frameCount, this.highScore);

    } else if (this.gameOver) {
      this.controller = null;
      clearInterval(this.frameInterval);
      clearInterval(this.level.spawnInterval);
      if (!this.won) {
        this.level.theme.pause();
        this.highScore = Math.floor(this.highScore + this.player.health);
 
        this.ctx.drawImage(
            this.embers,
            0,
            0,
            852,
            400,
            0, 0,
            900, 600
        );
  
        this.ctx.font = "130px Arial";
        this.ctx.fillStyle = "rgb(46, 2, 2)";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2);


        this.ctx.font = "80px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
          `YOUR SCORE IS ${this.highScore}`,
          this.canvas.width / 2,
          450
        );

        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
          "Press Enter to Play Again",
          this.canvas.width / 2,
          550
        );

      } else if (this.won) {
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

        this.ctx.font = "80px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`YOUR SCORE IS ${this.highScore}`, this.canvas.width / 2, 450);


        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press Enter to Play Again", this.canvas.width / 2, 550);
      }

    } 
    
  }

}





export default Game;