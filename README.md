# Fire Girl
Platformer

------
<h1 align="center">
  <img src="https://github.com/sswoodruff89/sswoodruff89.github.io/blob/master/images/firegirl/firegirlhome.png" width="600" height="auto" align="center"/>
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
