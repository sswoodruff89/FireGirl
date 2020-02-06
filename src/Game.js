import Player from "./Player";
import Level from "./Levels/Level";
import Collision from "./util/Collision";
import Controller from "./util/Controller";
import Enemy from "./Objects/Enemies/Enemy";
import Helicopter from "./Objects/Enemies/Helicopter";
import Flower from "./Objects/Enemies/Flower";
import Item from "./Objects/Items/Item";
import GameHUD from "./GameHUD";
import EasterEgg from "./Objects/Enemies/EasterEgg";

const CONSTANTS = {
  GRAVITY: 0.8,
  FRICTION: 2.5,
  MAX_VEL: 50
};


class Game {
  constructor(canvas, ctx, lvl = 1, screen) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.lvl = lvl;
    this.levelCall = {
      1: Level.level1(),
      "survivalMode": Level.level2()
    }
    this.player = new Player(this.ctx, this.canvas, [20, 210]);
    this.controller = new Controller(this.player, this);
    this.tileSize = canvas.width / 15;
    this.level = new Level({ 
      ctx: ctx,
      mapKeys: this.levelCall[lvl],
      player: this.player,
      screen: screen,
      tileSize: this.tileSize
    });

    this.collider = new Collision(this.tileSize);
    this.HUD = new GameHUD();
    this.frameCount = 0;
    this.enemies = {
      [this.level.screen]: this.level.enemies
    }

    this.items = {
      [this.level.screen]: this.level.items
    }

    this.showHUD = true;
    this.gameOver = false;
    this.embers = new Image();
    this.embers.src = "./assets/embers.jpg";

    this.tipsScreen = new Image();
    this.tipsScreen.src = "./assets/tipsScreen.png";


    this.highScore = 0;
    this.killCount = 0;
    this.trickShotCount = 0;
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
    if (this.level.screen === "survivalMode") return;
    if (Object.keys(this.enemies[this.level.screen]).length === 0) {
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
    (colVal === 58 || colVal === 59) ? climbCount++ : "";
    this.collider.collidePlatform(
      this.player,
      left * this.tileSize,
      top * this.tileSize,
      colVal, 
      this.tileSize    
    );

    [right, top] = this.getTopRightPos();
    colVal = physMap[top * cols + right];
    (colVal === 58 || colVal === 59) ? climbCount++ : "";

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
    (colVal === 58 || colVal === 59) ? climbCount++ : "";
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
    (colVal === 58 || colVal === 59) ? climbCount++ : "";
    if (this.player.canClimb && climbCount === 0) {
      this.player.climbing = false;
      this.player.canClimb = false;
    }
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
      this.player.x += this.player.velX;
    }
    if (this.player.climbing) {
        this.player.isClimbing();
    } else {
        this.player.inAir();

    }

    // this.collider.collidePlayer(this.player, this.canvas, this.cleared);
    this.playerPlatformCheck();
  }

  renderEnemies() {
    this.enemyCount = Object.keys(this.level.enemies).length;

    if (!this.cleared) {
      for (let key in this.enemies[this.level.screen]) {
        let enemy = this.enemies[this.level.screen][key];
        // if (this.enemies[key].dying && !this.enemies[key].dead) continue;
        this.projectilePlatformCheck(enemy);

        if (!enemy.dead) {
          enemy.drawEnemy(this.ctx, this.frameCount);
          this.collider.collideEnemy(this.player, enemy);
          enemy.move(this.canvas, this.player, this.ctx);

        } else {
          this.player.setDamageMeter(enemy.points / 2);
          this.highScore += enemy.points;
          this.killCount++;

          if (enemy.trickShot) {
            this.trickShotCount++;
            if (this.trickShotCount % 6 === 0) {
              this.items[this.level.screen][101] = new Item(Item.blueCrystal([enemy.x, enemy.y], true));
            }
          }
          if (this.killCount % 22 === 0) {
            this.spawnItems([enemy.x, enemy.y]);
          }
          if (enemy instanceof EasterEgg) {
            this.items[this.level.screen][9000] = new Item(Item.hylianShield([enemy.x + enemy.width / 2, enemy.y + enemy.height / 2], true));
          }

          delete this.enemies[this.level.screen][key];
          this.enemyCount -= 1;
        }
      }
      this.enemiesCleared();
    }
  }

  spawnItems(pos) {
    if (this.player.damageBoost) {
      this.items[this.level.screen][100] = new Item(Item.blueHealth(pos, true));
    } else {
      this.items[this.level.screen][100] = new Item(Item.health(pos, true));
    }
  }

  renderItems() {
    if (!this.items[this.level.screen] || Object.values(this.items[this.level.screen]).length === 0) return;
    
    let items = this.items[this.level.screen];
    for (let key in items) {
      items[key].checkCollected(this.player);
      if (!items[key].collected) {
        items[key].drawItem(this.ctx, this.frameCount);
      } else {
        delete items[key];
      }
    }
  }

  renderFireballs() {
    if (Object.keys(this.player.fireballs).length !== 0) {
      for (let key in this.player.fireballs) {
        let fireball = this.player.fireballs[key];
        
        if (this.enemyCount !== 0) {
          for (let key in this.enemies[this.level.screen]) {
            this.collider.collideEnemy(
              fireball,
              this.enemies[this.level.screen][key]
            );
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
    Object.values(this.enemies[this.level.screen]).forEach((enemy) => {
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
    this.ctx.fillText(
      "Paused",
      this.canvas.width / 2,
      40
    );

    this.ctx.font = "1.3em Arial";
    this.ctx.fillStyle = "pink";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `Music: ${this.level.theme.name} by ${this.level.theme.artist}`,
      this.canvas.width / 2,
      580
    );

  }


  loadLevel() {
    if (((this.player.x + (this.player.width / 2)) >= this.canvas.width)) {
      if (this.level.screen === parseInt(this.level.lastScreen)) {
        this.won = true;
        return;
      }
    }
    // if (!this.cleared) return;
    if (this.level.nextScreen(this.player, this.canvas, this.level.loadLevel, this.cleared)) {
      this.cleared = false;
      if (!this.enemies[this.level.screen]) {
        this.enemies[this.level.screen] = this.level.enemies;
      }
      if (!this.items[this.level.screen]) {
        this.items[this.level.screen] = this.level.items;
      }
      this.enemyCount = Object.keys(this.enemies);

    }
  }

  survivalMode() {
    if (this.level.screen !== "survivalMode") return;
    if (this.level.rushLevel === 0) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(5000, 5);
    } else if (this.highScore > 25 && this.level.rushLevel === 1) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(4500, 6);
    } else if (this.highScore > 50 && this.level.rushLevel === 2) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(4000, 6);
    } else if (this.highScore > 80 && this.level.rushLevel === 3) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(4000, 7);
    } else if (this.highScore > 120 && this.level.rushLevel === 4) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(3500, 7);
    } else if (this.highScore > 160 && this.level.rushLevel === 5) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(3000, 7);
    } else if (this.highScore > 200 && this.level.rushLevel === 6) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(2500, 8);
    } else if (this.highScore > 250 && this.level.rushLevel === 7) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(2000, 8);
    } else if (this.highScore > 300 && this.level.rushLevel === 8) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(1500, 9);
    } else if (this.highScore > 350 && this.level.rushLevel === 9) {
      this.level.rushLevel++;
      this.level.enemyRushInterval(1000, 9);
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
      if (this.level.screen > 5 && this.level.screen !== 12) this.level.drawLevel(this.ctx);
      this.player.drawSprite(this.frameCount);
      // this.player.drawPlayer(this.frameCount);
      this.playerUpdate();
      if (this.level.screen < 6 || this.level.screen == 12) {
        this.level.renderMid(this.ctx, this.canvas);
      }
      this.survivalMode(this.level, this.highScore);

      this.renderEnemies();
      this.renderItems();
      this.renderEnemyProjectiles();
      this.renderFireballs();
      if (this.level.screen !== 6) {
        this.level.renderFront(this.ctx, this.canvas);
      }
      
      if (this.showHUD) {
        this.HUD.drawHUD(this.canvas, this.ctx, this.player, this.frameCount, this.highScore);
      }
      
    } else if (this.gameOver) {
      this.controller = null;
      clearInterval(this.frameInterval);
      clearInterval(this.level.spawnInterval);
      Object.values(this.level.enemies).forEach((en) => {
        en.dead = true;
      })
      
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
          400
        );

        if (this.level.screen !== "survivalMode") {
          this.ctx.font = "40px Arial";
          this.ctx.fillStyle = "pink";
          this.ctx.textAlign = "center";
          this.ctx.fillText(
            "Press C to Continue",
            this.canvas.width / 2,
            480
          );

        }
        this.ctx.font = "40px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
          "Press Enter to Start Over",
          this.canvas.width / 2,
          550
        );

      } else if (this.won) {
        // this.level.theme.pause();

        this.ctx.drawImage(
          this.embers,
          0,
          0,
          852,
          400,
          0, 0,
          900, 600
        );
        // this.ctx.font = "80px Arial";
        // this.ctx.fillStyle = "pink";
        // this.ctx.textAlign = "center";
        // this.ctx.fillText("CONGRATS!", this.canvas.width / 2, 160);


        this.ctx.font = "80px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText("YOU BEAT LEVEL 1!", this.canvas.width / 2, 160);

        this.ctx.font = "60px Arial";
        this.ctx.fillStyle = "pink";
        this.ctx.textAlign = "center";
        this.ctx.fillText("THANK YOU FOR PLAYING!", this.canvas.width / 2, this.canvas.height / 2);

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