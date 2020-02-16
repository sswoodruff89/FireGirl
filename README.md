<h1 align="center">
  <img alt="logo" src="https://github.com/sswoodruff89/JSProject/blob/master/assets/firegirl_logo_dark.png" width="420" height="100">
</h1>

## Overview
Fire Girl is a 2D action platformer game that harkens back to the days of the NES.


## Built With
* HTML5 Canvas
* Google Firebase

## Features



### Collision Detection
<h1 align="center">
  <img src="https://media.giphy.com/media/QynCAaUmS8CflnSJc9/giphy.gif" width="600" height="auto" align="center"/>
</h1>

The first major challenge of building this game was the collision detection, which had to be tackled on multiple fronts. First and foremost was platform collision. I researched a variety of possible solutions, and one I focused on involved the use of a collision map comprised of an array of values. 

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

, scrollable carousel of movies per genre that was not smooth when going back and forth but also handled lists of varying length. Getting the structure of each list down was pretty straightforward-- each list being a 'ul' of movie items --which would then be slid back and forth inside another container with a hidden overflow. The amount of movement was the real challenge. Keeping the page as responsive as possible to the window size meant setting most units of measurement to percentages or viewing width. I also had to make sure a list would scroll off the screen when it reached it's end.
* Gave Player, Enemies, and Projectiles accurate collision detection to platforms and each other without lagging when a dozen or so objects are on screen
* Platform collision is based on a tile map map where each element has a value that corresponds to a key in a object of collision check functions


## MVP
### 1. Moveable character with attacks (1/2 Day)
* Have character and movingObject class (subclass of Object)
* Player should be able to move left/right and jump on key press
* Max velocity for moving and falling set
* Have projectile attack


### 2. Several level/ level sections (1 Day)
* Render a handful of levels
    * Either have a scrolling level or break it up into static sections that render a new section when player reaches the end
* Platforms should have collision checks with player (in a collision util file or class)
    * can't jump through or fall through ground

### 3. Render enemies (1 Day)
* Create at least two enemies with different behaviors (subclass of Object)
* Have at least one attack each
* Uses collision algorithm to determine when enemy is hit or player is hit

### 4. Render animated sprites (1 Day [interspersed with other tasks] )
* Create animation util file or class
* Running and jump sprite for player
* Attack sprites for player and enemies

### Bonus
* Create a boss battle
* Have another character with different abilities
* Have collectables that upgrade powers


## File Structure
* /dist
* /src
  * /assets
      * /sprites
      * /levels
  * Game.js
  * GameView.js
  * /Objects (hold Object class and subclasses)
    * Object.js
    * /Platforms (hold Platform class and instances)
      * Platform.js
    * /Characters (hold Character class and instances)
      * Character.js
    * /Enemies (hold Enemy class and instances)
      * Enemy.js
    * /Projectiles (hold Projectile class and instances)
      * Projectile.js
  * /Levels (hold Level class and level instances)
    * Level.js
  * /util
    * Animation.js
    * Collision.js
  * Player.js
  * index.js
* Index.html
* /node_modules
* package.json
* .gitignore
* webpack.config.js
* Index.html


## Technology
* CanvasHTML
* EaselJS
* VanillaDOM
