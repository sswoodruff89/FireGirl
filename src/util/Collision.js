import Player from "../Player";
import Projectile from "../Objects/Projectiles/Projectile";
import Enemy from "../Objects/Enemies/Enemy";
// import Helicopter from "../Objects/Enemies/Helicopter";

class Collision {
  constructor() {


    this.collidePlayer = this.collidePlayer.bind(this);
    this.collidePlatform = this.collidePlatform.bind(this);
    this.collidePlatTop = this.collidePlatTop.bind(this);
    this.collidePlatBottom = this.collidePlatBottom.bind(this);
    this.collidePlatLeft = this.collidePlatLeft.bind(this);
    this.collidePlatRight = this.collidePlatRight.bind(this);
    // this.collidePlatformSlopeRight = this.collidePlatformSlopeRight.bind(this);
    this.collideSlopeFortyFiveRight = this.collideSlopeFortyFiveRight.bind(
      this
    );
    this.collideSlopeFortyFiveLeft = this.collideSlopeFortyFiveLeft.bind(this);
    this.collideSlopeTwentyLeft = this.collideSlopeTwentyLeft.bind(this);
    this.collideSlopeTwentyRight = this.collideSlopeTwentyRight.bind(this);

    this.climbable = this.climbable.bind(this);

    this.collideEnemy = this.collideEnemy.bind(this);

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
        ///top / left
        if (this.collidePlatTop(obj, y)) {
          return;
        } else {
          // this.collidePlatTop(obj, y)
          this.collidePlatLeft(obj, x);
        }
      },
      4: (obj, x, y, colVal, tileSize) => {
        ///top / left / right
        if (this.collidePlatTop(obj, y)) {
          return;
        } else if (this.collidePlatRight(obj, x + tileSize)) {
          return;
        } else {
          this.collidePlatLeft(obj, x);
        }
      },
      5: (obj, x, y, colVal, tileSize) => {
        ///top / bottom / right
        if (this.collidePlatTop(obj, y)) {
          return;
        } else if (this.collidePlatBottom(obj, y + tileSize)) {
          return;
        } else {
          this.collidePlatRight(obj, x + tileSize);
        }
      },
      6: (obj, x, y, colVal, tileSize) => {
        ///top / bottom
        if (this.collidePlatTop(obj, y)) {
          return;
        } else {
          this.collidePlatBottom(obj, y + tileSize);
        }
      },
      7: (obj, x, y, colVal, tileSize) => {
        ///thorn bottom
        this.collidePlatBottom(obj, y + tileSize / 6);
        if (obj instanceof Player) {
          obj.setHit(5);
        }
      },
      8: (obj, x, y, colVal, tileSize) => {
        ///top / right
        if (this.collidePlatTop(obj, y)) {
          return;
        } else {
          this.collidePlatRight(obj, x + tileSize);
        }
      },
      9: (obj, x, y, colVal, tileSize) => {
        ///left
        this.collidePlatLeft(obj, x);
      },
      10: (obj, x, y, colVal, tileSize) => {
        ///right
        this.collidePlatRight(obj, x + tileSize);
      },
      11: (obj, x, y, colVal, tileSize) => {
        ///right / left / bottom thorn
        if (this.collidePlatLeft(obj, x)) {
          if (obj instanceof Player) {
            obj.setHit(5);
          }
          return;
        } else if (this.collidePlatBottom(obj, y + tileSize / 6)) {
          if (obj instanceof Player) {
            obj.setHit(5);
          }
          return;
        } else {
          this.collidePlatRight(obj, x + tileSize);
          if (obj instanceof Player) {
            obj.setHit(5);
          }
        }
      },
      12: (obj, x, y, colVal, tileSize) => {
        //top / left half in
        if (this.collidePlatLeft(obj, x + tileSize / 2)) {
          return;
        } else if (obj.x + obj.width > x + tileSize / 2) {
          this.collidePlatTop(obj, y);
        }
      },
      13: (obj, x, y, colVal, tileSize) => {
        //top / right half in
        if (this.collidePlatRight(obj, x + tileSize / 2)) {
          return;
        } else if (obj.x < x + tileSize / 2) {
          this.collidePlatTop(obj, y);
        }
      },
      14: (obj, x, y, colVal, tileSize) => {
        /// bottom / left
        if (this.collidePlatBottom(obj, y + tileSize)) {
          return;
        } else {
          this.collidePlatLeft(obj, x);
        }
      },
      15: (obj, x, y, colVal, tileSize) => {
        /// bottom / right
        if (this.collidePlatBottom(obj, y + tileSize)) {
          return;
        } else {
          this.collidePlatRight(obj, x);
        }
      },
      16: (obj, x, y, colVal, tileSize) => {
        /// bottom
        this.collidePlatBottom(obj, y + tileSize);
      },
      17: (obj, x, y, colVal, tileSize) => {
        ///left
        this.collidePlatLeft(obj, x);
      },

      18: (obj, x, y, colVal, tileSize) => {
        //45 deg right
        this.collideSlopeFortyFiveRight(obj, x, y + tileSize);
      },
      19: (obj, x, y, colVal, tileSize) => {
        //45 deg left
        this.collideSlopeFortyFiveLeft(obj, x + tileSize, y + tileSize);
      },
      20: (obj, x, y, colVal, tileSize) => {
        //22 deg right bottom half
        this.collideSlopeTwentyRight(obj, x, y + tileSize);
      },
      21: (obj, x, y, colVal, tileSize) => {
        //22 deg left bootom half
        this.collideSlopeTwentyLeft(obj, x + tileSize, y + tileSize);
      },
      22: (obj, x, y, colVal, tileSize) => {
        //22 deg right top half
        this.collideSlopeTwentyRight(obj, x, y + tileSize, tileSize / 2);
      },
      23: (obj, x, y, colVal, tileSize) => {
        //22 deg left top half
        this.collideSlopeTwentyLeft(obj, x, y + tileSize, tileSize / 2);
      },
      24: (obj, x, y, colVal, tileSize) => {
        //22 deg left top half & left
        ///refactor////
        if (this.collidePlatLeft(obj, x)) {
          return;
        } else {
          this.collideSlopeTwentyLeft(obj, x, y + tileSize, tileSize / 2);
        }
      },
      25: (obj, x, y, colVal, tileSize) => {
        //right half in
        this.collidePlatRight(obj, x + tileSize / 2);
      },
      26: (obj, x, y, colVal, tileSize) => {
        //left half in
        this.collidePlatLeft(obj, x + tileSize / 2);
      },
      27: (obj, x, y, colVal, tileSize) => {
        //top  half in/ right half in
        if (this.collidePlatRight(obj, x + tileSize / 2)) {
          return;
        } else if (obj.x < x + tileSize / 2) {
          this.collidePlatTop(obj, y + tileSize / 2);
        }
      },
      28: (obj, x, y, colVal, tileSize) => {
        //top  half in/ right half in / bottom
        if (obj.x < x + tileSize / 2) {
          if (this.collidePlatTop(obj, y + tileSize / 2)) {
            return;
          } else if (this.collidePlatBottom(obj, y + tileSize)) {
            return;
          } else {
            this.collidePlatRight(obj, x + tileSize / 2);
          }
        }
      },
      29: (obj, x, y, colVal, tileSize) => {
        //top half in
        this.collidePlatTop(obj, y + tileSize / 2);
      },
      30: (obj, x, y, colVal, tileSize) => {
        //top  half in/ left half in / bottom
        if (obj.x + obj.width > x + tileSize / 2) {
          if (this.collidePlatTop(obj, y + tileSize / 2)) {
            return;
          } else if (this.collidePlatBottom(obj, y + tileSize)) {
            return;
          } else {
            this.collidePlatLeft(obj, x + tileSize / 2);
          }
        }
      },
      31: (obj, x, y, colVal, tileSize) => {
        //top  half in/ right
        if (this.collidePlatTop(obj, y + tileSize / 2)) {
          return;
        } else {
          this.collidePlatRight(obj, x + tileSize);
        }
      },
      32: (obj, x, y, colVal, tileSize) => {
        //top  half in/ left
        if (this.collidePlatTop(obj, y + tileSize / 2)) {
          return;
        } else {
          this.collidePlatLeft(obj, x);
        }
      },
      33: (obj, x, y, colVal, tileSize) => {
        //top  half in/ left
        if (obj.x > x + (tileSize / 4) && obj.x < x + (tileSize * (3/4))) {

          this.climbable(obj, x, y, tileSize);
        }
      }
    };
  }

  collidePlayer(player, canvas, cleared) {
    // debugger
    if (player.x < 0) {
      player.x = 0.01;
      player.velX = 0;
    } else if (player.x + player.width > canvas.width && !cleared) {
      player.x = canvas.width - player.width;
      player.velX = 0;
    }

    // if (player.y < 0) {
    //   player.velY = 0;
    //   player.y = 0.01;
    // } else
    if (player.y > canvas.height) {
      // player.velY = 0;
      // player.y = canvas.height - player.height - 0.1;
      // player.jumpCount = 2;
      // player.onGround = true;
      // player.dead = true;
      player.y = 0;
      player.setHit(50);
    }
  }

  climbable(obj, x, y) {
    debugger
    obj.canClimb = true;
  }

  collideProjectile(obj1, obj2) {
    // if (!obj1 || !obj2) return false;
    // if (obj2.dying || obj2.dead) return false;

    if (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    ) {
      obj1.velY = -(obj1.velY / 3);
      obj1.velX = -(obj1.velX / 3);
      ///hit
      obj1.setHit(obj2.damage);
      obj2.setHit();
      ///change Hit
      return true;
    } else {
      return false;
    }
  }

  collideEnemy(obj1, obj2) {
    // if (!obj1 || !obj2) return false;
    if (obj2.dying || obj2.dead) return false;

    if (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    ) {
      // if (this.hitBox(obj1, obj2)) {
      if (obj1 instanceof Player && !obj1.isHit) {
        obj1.velY = -(obj1.velY / 3);
        obj1.velX = -(obj1.velX / 3);
        ///hit
        obj1.setHit(obj2.damage);
        return true;
      }
      if (obj1 instanceof Projectile) {
        obj2.setHit(obj1.damage);
        setTimeout(() => {
          obj1.setHit();
        }, 10);

        return true;
      }
    } else {
      return false;
    }
  }

  ////////PLATFORM COLLISION

  collideSlopeFortyFiveRight(gameObj, tileLeft, tileBottom) {
    ///60 x60 120 y 60 120 (60, 120] [ 60, 120])
    // debugger
    let tileY = tileBottom - (gameObj.rightSide() - tileLeft);
    if (gameObj instanceof Player) {
      if (gameObj.onGround) {
        if (
          gameObj.bottomSide() > tileBottom &&
          gameObj.oldY + gameObj.height < tileBottom
        ) {
          gameObj.y = tileBottom - gameObj.height - 0.05;
          gameObj.onGround = true;
          gameObj.jumpCount = 2;
          return;
        }
        gameObj.y = tileY - gameObj.height - 0.05;
      } else if (!gameObj.onGround) {
        if (
          gameObj.rightSide() > tileLeft &&
          gameObj.bottomSide() > tileY &&
          gameObj.oldY + gameObj.height < tileY
        ) {
          gameObj.onGround = true;
          gameObj.jumpCount = 2;
          // gameObj.getDirY() + 60 > tileY) {
          gameObj.y = tileY - gameObj.height - 0.05;
        }
      }
    }

  }

  collideSlopeFortyFiveLeft(gameObj, tileRight, tileBottom) {
    let tileY = tileBottom - (tileRight - gameObj.leftSide());
    if (gameObj instanceof Player) {
      if (gameObj.onGround) {
        if (
          gameObj.bottomSide() > tileBottom &&
          gameObj.oldY + gameObj.height < tileBottom
        ) {
          gameObj.y = tileBottom - gameObj.height - 0.05;
          gameObj.onGround = true;
          gameObj.jumpCount = 2;
          return;
        }
        gameObj.y = tileY - gameObj.height - 0.05;
      } else if (!gameObj.onGround) {
        if (
          gameObj.leftSide() < tileRight &&
          gameObj.bottomSide() > tileY &&
          gameObj.oldY + gameObj.height < tileY
        ) {
          gameObj.onGround = true;
          gameObj.jumpCount = 2;
          gameObj.y = tileY - gameObj.height - 0.05;
        }
      }
    }
  }

  collideSlopeTwentyRight(gameObj, tileLeft, tileBottom, half = 0) {
    ///60 x60 120 y 60 120 (60, 120] [ 60, 120])
    // debugger
    let tileY = tileBottom - (half + (gameObj.rightSide() - tileLeft) / 2);
    if (gameObj instanceof Player) {
      if (gameObj.onGround) {
        if (
          gameObj.bottomSide() > tileBottom &&
          gameObj.oldY + gameObj.height < tileBottom
        ) {
          gameObj.y = tileBottom - gameObj.height - 0.05;
          gameObj.onGround = true;
          gameObj.jumpCount = 2;
          return;
        }
        gameObj.y = tileY - gameObj.height - 0.05;
      } else if (!gameObj.onGround) {
        if (
          gameObj.rightSide() > tileLeft &&
          gameObj.bottomSide() > tileY &&
          gameObj.oldY + gameObj.height < tileY
        ) {
          gameObj.onGround = true;
          gameObj.jumpCount = 2;
          // gameObj.getDirY() + 60 > tileY) {
          gameObj.y = tileY - gameObj.height - 0.05;
        }
      }
    }
  }

  collideSlopeTwentyLeft(gameObj, tileRight, tileBottom, half = 0) {
    let tileY = tileBottom - (half + (tileRight - gameObj.leftSide()) / 2);
    if (gameObj instanceof Player) {
      if (gameObj.onGround) {
        if (
          gameObj.bottomSide() > tileBottom &&
          gameObj.oldY + gameObj.height < tileBottom
        ) {
          gameObj.y = tileBottom - gameObj.height - 0.05;
          gameObj.onGround = true;
          gameObj.jumpCount = 2;
          return;
        }
        gameObj.y = tileY - gameObj.height - 0.05;
      } else if (!gameObj.onGround) {
        if (
          gameObj.leftSide() < tileRight &&
          gameObj.bottomSide() > tileY &&
          gameObj.oldY + gameObj.height < tileY
        ) {
          gameObj.onGround = true;
          gameObj.jumpCount = 2;
          gameObj.y = tileY - gameObj.height - 0.05;
        }
      }
    }
  }

  collidePlatTop(gameObj, tileTop) {
    if (
      gameObj.bottomSide() > tileTop &&
      gameObj.oldY + gameObj.height < tileTop
    ) {
      if (gameObj instanceof Projectile) {
        gameObj.setHit();
        //set null
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
      }
      gameObj.x = tileRight + 0.1;
      // if (gameObj instanceof Enemy) {
      //   gameObj.x = -gameObj.x;
      // }
      // gameObj.velX = 0;

      return true;
    }
    return false;
  }

  collidePlatLeft(gameObj, tileLeft) {
    if (gameObj.rightSide() > tileLeft && gameObj.oldX < tileLeft) {
      if (gameObj instanceof Projectile) {
        gameObj.setHit();
      }
      gameObj.x = tileLeft - gameObj.width - 0.1;
      // if (!gameObj instanceof Enemy) {
      //   gameObj.x = -gameObj.x;
      // }
      // gameObj.velX = 0;
      return true;
    }
    return false;
  }

  collidePlatform(gameObject, x, y, colVal, tileSize) {
    if (!colVal || !this.collisionPlatformKeys[colVal]) return;
    this.collisionPlatformKeys[colVal](gameObject, x, y, colVal, tileSize);
  }
}



export default Collision;
