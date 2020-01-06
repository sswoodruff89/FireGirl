# Untitled Platformer
Platformer

------

## Overview
${Untitled Platformer} is a 2D action platformer game that harkens back to the days of the NES. You can select from a handful of characters, each with their own abilities (such as throwing fire), to take on enemies (from monsters to mercenaries) as you traverse multiple levels.


## MVP
### 1. Moveable character with attacks 
* Have character and movingObject class (subclass of Object)
* Player should be able to move left/right and jump on key press
* Max velocity for moving and falling set
* Have projectile attack


### 2. Several level/ level sections
* Render a handful of levels
    * Either have a scrolling level or break it up into static sections that render a new section when player reaches the end
* Platforms should have collision checks with player (in a collision util file or class)
    * can't jump through or fall through ground

### 3. Render enemies
* Create at least two enemies with different behaviors (subclass of Object)
* Have at least one attack each
* Uses collision algorithm to determine when enemy is hit or player is hit

### 4. Render animated sprites
* Create animation util file or class
* Running and jump sprite for player
* Attack sprites for player and enemies

### Bonus
* Create a boss battle
* Have another character with different abilities
* Have collectables that upgrade powers

<img src="/Users/appacademystudent/Desktop/Screen Shot 2020-01-05 at 8.07.33 PM.png" width="600" height="auto" align="center"/>

## Interactions
Toggle through each list of movies, and as you hover over each thumbnail, it's clip will begin playing. On the thumbnail, you can go directly to the movie's watch page with the play button, add it to your watchlist with the watchlist button, or open the details page with the down arrow. The details page will display a synopsis, MPAA rating, a score (based on 5-stars), runtime, and genres with the clip playing in the background.

If you want to search for movies, open up the search bar and type in to get live results, along with a list of possible titles, directors, and genres you are looking for that will link you to a new set of results.

On the watch page, enjoy your movie of choice!


## Features
