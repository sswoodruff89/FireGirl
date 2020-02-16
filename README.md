<h1 align="center">
  <img alt="logo" src="https://github.com/sswoodruff89/JSProject/blob/master/assets/firegirl_logo_dark.png" width="420" height="100">
</h1>

## Overview
Fire Girl is a 2D action platformer game that harkens back to the days of the NES.


## Built With
* HTML5 Canvas
* Google Firebase

## Features



### Platform Collision Detection
<h1 align="center">
  <img src="https://media.giphy.com/media/QynCAaUmS8CflnSJc9/giphy.gif" width="600" height="auto" align="center"/>
</h1>

The first major challenge of building this game was the collision detection, which had to be tackled on multiple fronts. First and foremost was platform collision. I researched a variety of possible solutions, and one I focused on involved the use of a collision map comprised of an array of values. 

<h3 align="center">Screen 4</h3>

<h1 align="center">
  <img src="https://github.com/sswoodruff89/JSProject/blob/master/assets/Level1/lvl4.jpg" width="600" height="auto" align="center"/>
</h1>
<h3 align="center">Screen 4 Collision Map</h3>

```javascript
4: {
  physicalMap: [
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   36,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  2,  7,  0,  0,  0, 37, 39,  2, 58,  2,  2,  2, 38, 36,
    0,  2,  5, 15, 15, 39,  0,  0,  0, 59,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  5,  0,  0,  0, 59,  0,  0,  0,  0,  0,
    3,  3,  3,  3,  0, 40,  0,  0,  0, 59,  0,  0,  0,  0,  0,
    0,  0,  0,  5,  5,  0,  0,  0,  0, 59,  0,  0,  0,  0,  0,
    0,  0,  0,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
   33, 33, 33, 33, 33, 33,  6,  2,  2,  2,  2,  2, 34,  0,  0
  ],
  levelLayers: {
    background: "./assets/Level1/lvl4_back.png",
    mid: "./assets/Level1/lvl4_mid.png",
    front: "./assets/Level1/lvl4_front.png"
  }
```

As the game runs, the player's x and y position will constantly be checked against the collision map, more specifically where their top-left, top-right, bottom-left, and bottom-right coordinates are. A value will be returned from the array map, which represents a type platform the player is interacting with. The value is passed into a function (along with the coordinates) that calls on an instance of the Collision class initiated at the start of the game.

```javascript
class Game {
  constructor(canvas, ctx, lvl = 1, screen) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.lvl = lvl;
    this.levelCall = {
      1: Level.level1(),
      "survivalMode": Level.level2()
    }
    this.tileSize = canvas.width / 15;
    this.player = new Player(this.ctx, this.canvas, [20, 210]);
    this.controller = new Controller(this.player, this);
    this.collider = new Collision(this.tileSize);
```
---
```javascript
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
  }

  this.collider.collidePlatform(
    this.player,
    right * this.tileSize,
    bottom * this.tileSize,
    colVal,
    this.tileSize
  );
}
```
The collidePlatform() function uses the map value to key into a collision object, which is made up of dozens of functions that adjust the player's position based on a specific collision scenario (Ex. Are they hitting it from the top, or bumping into it from the bottom?). Unique collisions also include slopes of varying degrees and climbable objects, like vines or ladders. If the player's bottom two coordinates have a value of 0, the player will start falling.

** This collision system is also used on certain enemies and projectiles as well.
```javascript
collidePlatform(gameObject, x, y, colVal, tileSize) {
  if (!colVal || !this.collisionPlatformKeys[colVal]) return;
  this.collisionPlatformKeys[colVal](gameObject, x, y, colVal, tileSize);
}

this.collisionPlatformKeys = {
  1: (obj, x, y, colVal, tileSize) => {
    this.collidePlatTop(obj, y);
  },
  2: (obj, x, y, colVal, tileSize) => {
    ////thin platform
    if (obj.velY > 0) {
      this.collidePlatTop(obj, y);
    }
  },
  3: (obj, x, y, colVal, tileSize) => {
    /// bottom
    this.collidePlatBottom(obj, y + tileSize);
  },
  4: (obj, x, y, colVal, tileSize) => {
    ///left
    this.collidePlatLeft(obj, x);
  },
  5: (obj, x, y, colVal, tileSize) => {
    ///right
    this.collidePlatRight(obj, x + tileSize);
  },
  6: (obj, x, y, colVal, tileSize) => {
    ///top / left
    ///  __
    /// |
    if (this.collidePlatTop(obj, y)) {
      return;
    } else {
      // this.collidePlatTop(obj, y)
      this.collidePlatLeft(obj, x);
    }
  },
  7: (obj, x, y, colVal, tileSize) => {
    ///top / right
    ///  __
    ///    |
    if (this.collidePlatTop(obj, y)) {
      return;
    } else {
      this.collidePlatRight(obj, x + tileSize);
    }
  },
  8: (obj, x, y, colVal, tileSize) => {
    /// bottom / left
    ///   __|

    if (this.collidePlatBottom(obj, y + tileSize)) {
      return;
    } else {
      this.collidePlatLeft(obj, x);
    }
  },
  9: (obj, x, y, colVal, tileSize) => {
    /// bottom / right
    ///   |__
    if (this.collidePlatBottom(obj, y + tileSize)) {
      return;
    } else {
      this.collidePlatRight(obj, x);
    }
  },
//............//

collidePlatTop(gameObj, tileTop) {
  if (
    gameObj.bottomSide() > tileTop &&
    gameObj.oldY + (gameObj.height * .95) < tileTop
  ) {
    if (gameObj instanceof Projectile) {
      gameObj.setHit();
      return true;
    }
    gameObj.velY = 0;
    gameObj.y = tileTop - gameObj.height - 0.1;
    if (gameObj instanceof Player) {
      gameObj.onGround = true;
      gameObj.jumpCount = 2;
    }
    return true;
  } else {
    if (gameObj instanceof Player) {
      gameObj.onGround = false;
    }
  }
  return false;
}

collidePlatBottom(gameObj, tileBottom) {
  if (
    gameObj.topSide() < tileBottom &&
    gameObj.oldY + gameObj.height > tileBottom
  ) {
    if (gameObj instanceof Projectile) {
      gameObj.setHit();
      return true;
    }
    gameObj.y = tileBottom + 0.1;
    gameObj.velY = 0;
    return true;
  }
  return false;
}

collidePlatRight(gameObj, tileRight) {
  if (
    gameObj.leftSide() < tileRight &&
    gameObj.oldX + gameObj.width > tileRight
  ) {
    if (gameObj instanceof Projectile) {
      gameObj.setHit();
      return true;
    }
    gameObj.x = tileRight + 0.1;

    return true;
  }
  return false;
}

collidePlatLeft(gameObj, tileLeft) {
  if (gameObj.rightSide() > tileLeft && gameObj.oldX < tileLeft) {
    if (gameObj instanceof Projectile) {
      gameObj.setHit();
      return true;
    }
    gameObj.x = tileLeft - gameObj.width - 0.1;
    return true;
  }
  return false;
}
```

### Screen Loading
<h1 align="center">
  <img src="https://media.giphy.com/media/kHknO0sYxw8wQ9vQXc/giphy.gif" width="600" height="auto" align="center"/>
</h1>

The Level 1 demo runs on a screen-to-screen playthrough. An instance of the Level class is initialized when the game starts with a Level static method passed as an argument, which returns an object containing all the screens that make up the level. Inside each screen object are the collision map for that screen, its enemies, the level design (broken into a background, mid, and foreground layout), items, music, and a function that is called when the player collides with the screen boundaries.

```javascript
loadLevel(num) {
  this.screen = num;
  this.renderMap = this.mapKeys[this.screen].renderMap;
  this.physicalMap = this.mapKeys[this.screen].physicalMap;
  this.enemies = this.mapKeys[this.screen].enemies();
  this.items = this.mapKeys[this.screen].items();
  this.nextScreen = this.mapKeys[this.screen].nextScreen;

  if (this.mapKeys[this.screen].levelLayers) {
    this.levelLayers = this.loadImages(this.mapKeys[this.screen].levelLayers);
  }

  if (this.mapKeys[this.screen].theme) {
    let muted = this.theme.music.muted;
    this.theme.pause();
    this.theme = new Music(this.mapKeys[this.screen].theme);
    this.theme.play();
    this.theme.music.muted = muted;
  }
  this.enemiesInterval();
}

static level1() {
    return {
      0: {
        renderMap: [
        ],
        physicalMap: [
          0,  0,  0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0, 18,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          3,  3,  3, 40,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
          0,  0,  0,  0,  0,  0,  0, 23,  2,  2,  2, 24,  0,  0,  0,
          1,  2, 34,  0,  0,  0,  0, 17,  0,  0,  0, 18,  0,  0,  0,
          0,  0,  1, 34,  0,  0,  0, 17,  0,  0,  0, 18,  0,  0,  0,
          1,  1,  1,  1,  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  1
        ],
        enemies: () => {
          return {
            1: new Pterahawk(Pterahawk.pter4([800, 30], [300, 950], "left")),
            2: new Pterahawk(Pterahawk.pter2([800, 120], [300, 950], "right"))
          };
        },
        theme: {
          src: "./assets/Sound/ff9_stirring_forest.mp3",
          name: "Stirring the Forest",
          artist: "Nobuo Uematsu",
          volume: .6
        },
        levelLayers: {
          background: "./assets/Level1/lv1_back.png",
          mid: "./assets/Level1/lv1_mid.png",
          front:  "./assets/Level1/lv1_front.png"
        },
        items: () => {
          return {
          };
        },
        nextScreen: (player, canvas, loadLevel, cleared) => {
          if (player.x + player.width / 2 > canvas.width) {
            if (!cleared) {
              player.x = canvas.width - player.width / 2;
              player.velX = 0;
            } else {
              loadLevel(2);
              player.x = 0 - player.width / 2;
              player.y = player.y;
              return true;
            }
          } else if (player.x + player.width / 2 < 0) {
            loadLevel(1);
            player.x = canvas.width - player.width / 2;
            player.y = player.y;
            return true;
          } else if (player.y > canvas.height) {
            player.y = 0;
            player.setHit(50);
            return false;
          } else {
            return false;
          }
        }
      },
```
In this example, if the player collides with the right edge of the screen and all enemies are defeated, the loadLevel() function (passed in as a callback) will load the next screen, reassigning the corresponding variables with the next screen's content. Colliding with the left will load a different screen, typically the previous one, though this allows the possibility for future non-linear level design. Other screen-loading scenarios include climbing up to the top of the screen or falling from a higher screen to the one below. Previously-visited screens and their content are cached inside the instance of the Game, allowing faster loads as well as preventing the respawning of defeated enemies.

** The render map object is used for early screen development using a tile map array approach, much like the collision map, except that each value corresponds to a position on an image. If there are no levelLayers, a function is called that iterates through the render map and paints each tile on the canvas in order. This allowed for swift level design in the early stages of the demo, as designing the back, mid, and foreground on photoshop was a time-consuming process.

### Enemy AI

<h1 align="center">
  <img src="https://media.giphy.com/media/XeXz7wCUNmnRm9hz0Z/giphy.gif" width="600" height="auto" align="center"/>
</h1>

While a handful of enemies run on static mobility (only left and right, or up and down), I implemented a handful of enemies that move based on the position of the player. This required passing the player object into each enemy as they are rendered, 
allow them to consistently track them down. For example, "Jellyfish" enemies will follow the player but hover over them instead of hitting them directly, allowing them to drop electrical bombs on top of the player or cutting them off. Another enemy, the "Vineheads" creep towards the player, and if the player's position is within their line of sight, the enemy charges. This made them a difficult enemy to defeat, especially when there are many, and this led me to making a boss based on a version of them. 

### Survival Mode

<h1 align="center">
  <img src="https://media.giphy.com/media/eKJG9ufVsZmqalZtE9/giphy.gif" width="600" height="auto" align="center"/>
</h1>

In addition to the Level 1 demo, I created a survival mode where the player faces off an endless spawn of enemies. Each enemy has a points value (which is doubled if the player kills them with an overhead shot), and the higher the points, the faster enemies spawn and the higher the count of enemies allowed on screen. I implemented Google Firebase to log high scores, which is updated live. So if your playing and someone else gets a high score, the leaderboard will load it during your playthrough.


