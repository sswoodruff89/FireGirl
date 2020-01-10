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
    this.level = new Level({ 
      ctx: ctx,
      mapKeys: Level.level1()
    });
    this.physicalMap = this.level.physicalMap;
    this.tileSize = this.level.tileSize;
    this.collider = new Collision();
    this.HUD = new GameHUD();
    this.frameCount = 0;
    this.enemies = this.level.enemies;
    this.gameOver = false;
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
    this.enemiesCleared = this.enemiesCleared.bind(this);
    this.loadLevel = this.loadLevel.bind(this);

    this.enemyCount = Object.keys(this.enemies).length;
    this.cleared = false;

    this.startFrameCount();
  }

  startFrameCount() {
    this.frameInterval = setInterval(() => {
      this.frameCount++;
    }, (1000 / 30));
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
    console.log(this.enemyCount);
    if (this.enemyCount === 0) {
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

    [left, top] = this.getTopLeftPos();
    colVal = this.physicalMap[top * cols + left];
    this.collider.collidePlatform(
      this.player,
      left * this.tileSize,
      top * this.tileSize,
      colVal    
    );

    [right, top] = this.getTopRightPos();
    colVal = this.physicalMap[top * cols + right];
    this.collider.collidePlatform(
      this.player,
      right * this.tileSize,
      top * this.tileSize,
      colVal    
    );

    [left, bottom] = this.getBottomLeftPos();
    colVal = this.physicalMap[bottom * cols + left];
    (colVal === 0) ? floorCount++ : "";
    this.collider.collidePlatform(
      this.player,
      left * this.tileSize,
      bottom * this.tileSize,
      colVal    
    );


    [right, bottom] = this.getBottomRightPos();
    colVal = this.physicalMap[bottom * cols + right];
    (colVal === 0) ? floorCount++ : "";
    if (floorCount === 2) {
      this.player.onGround = false;
      // if (this.player.jumpCount === 2) this.player.jumpCount -=;
    }
    this.collider.collidePlatform(
      this.player,
      right * this.tileSize,
      bottom * this.tileSize,
      colVal
    );
  }


  projectilePlatformCheck(projectile) {
    let colVal;
    let top;
    let bottom;
    let right;
    let left;
    let cols = 15;

    if (projectile.dir === "left") {
      [left, top] = projectile.getTopLeftPos();
      colVal = this.physicalMap[top * cols + left];
      this.collider.collidePlatform(
        projectile,
        left * this.tileSize,
        top * this.tileSize,
        colVal
      );

      [left, bottom] = projectile.getBottomLeftPos();
      colVal = this.physicalMap[bottom * cols + left];
      this.collider.collidePlatform(
        projectile,
        left * this.tileSize,
        bottom * this.tileSize,
        colVal
      );
    }

    if (projectile.dir === "right") {
      [right, top] = projectile.getTopRightPos();
      colVal = this.physicalMap[top * cols + right];
      this.collider.collidePlatform(
        projectile,
        right * this.tileSize,
        top * this.tileSize,
        colVal
      );

      [right, bottom] = projectile.getBottomRightPos();
      colVal = this.physicalMap[bottom * cols + right];

      this.collider.collidePlatform(
        projectile,
        right * this.tileSize,
        bottom * this.tileSize,
        colVal
      );

    }

  }
  

  playerUpdate() {
    this.player.setRunning();
    this.player.isIdle();
    this.player.setOldPos();

    if (!this.player.idle) {
      
      if (this.player.direction === "right") {
        if (this.player.onGround && !this.player.keydown) {
          this.player.velX < 1 ? (this.player.velX = 0) : (this.player.velX /= CONSTANTS.FRICTION);
        }
      } else if (this.player.direction === "left") {
        if (this.player.onGround && !this.player.keydown) {
          this.player.velX > -1 ? (this.player.velX = 0) : (this.player.velX /= CONSTANTS.FRICTION);
        }
      }
      this.player.x += this.player.velX;
    }

    this.player.inAir();

    this.collider.collidePlayer(this.player, this.canvas, this.cleared);
    this.playerPlatformCheck();
    this.loadLevel(Level.level2());
  }

  renderEnemies() {
    
    if (!this.cleared) {
      for (let key in this.enemies) {
        if (this.enemies[key].dying && !this.enemies[key].dead) continue;
        this.projectilePlatformCheck(this.enemies[key]);

        if (!this.enemies[key].dead) {
          this.enemies[key].move(this.canvas);
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
        
        if (Object.values(this.enemies).length !== 0) {
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

  loadLevel(nextLevel) {
    if (this.player.x + (this.player.width / 2) === this.canvas.width) {
      this.level = new Level({ctx: this.ctx, mapKeys: nextLevel()});
      this.player.x = 0;
    }
  }

  isGameOver() {
    this.gameOver = (this.player.dead) ? true : false;
  }
  

  runGame() {
    this.isGameOver();

    if (!this.gameOver) {

      this.level.drawLevel(this.ctx);
      this.player.drawPlayer(this.frameCount);
      this.playerUpdate();


      // this.enemies[1].drawEnemy(this.ctx, this.frameCount);
      this.renderEnemies();
      // this.enemies[1].callAttack(this.frameCount);
      
      this.renderEnemyProjectiles();
      this.renderFireballs();
      
      this.HUD.drawHUD(this.canvas, this.ctx, this.player, this.frameCount);

    } else {
      this.ctx.beginPath();
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "rgba(255, 255, 255, .1)";
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.font = "130px Arial";
      this.ctx.fillStyle = "red";
      this.ctx.textAlign = "center";
      this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2);

    } 
    
  }

}



export default Game;