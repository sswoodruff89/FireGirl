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
    this.collideEnemy = this.collideEnemy.bind(this);

    this.collisionPlatformKeys = {
      1: (obj, x, y, colVal) => {
        this.collidePlatTop(obj, y);
      },
      2: (obj, x, y, colVal) => {
        ////thin platform
        if (obj.velY > 0) {
          this.collidePlatTop(obj, y);
        }
      },
      3: (obj, x, y, colVal) => {
        ///top / left
        if (this.collidePlatTop(obj, y)) {
          return;
        } else {
          // this.collidePlatTop(obj, y)
          this.collidePlatLeft(obj, x);
        }
      },
      4: (obj, x, y, colVal) => {
        ///top / left / right
        if (this.collidePlatTop(obj, y)) {
          return;
        } else if (this.collidePlatRight(obj, x + 60)) {
          return;
        } else {
          this.collidePlatLeft(obj, x);
        }
      },
      5: (obj, x, y, colVal) => {
        ///top / bottom / right
        if (this.collidePlatTop(obj, y)) {
          return;
        } else if (this.collidePlatBottom(obj, y + 60)) {
          return;
        } else {
          this.collidePlatRight(obj, x + 60);
        }
      },
      6: (obj, x, y, colVal) => {
        ///top / bottom
        if (this.collidePlatTop(obj, y)) {
          return;
        } else {
          this.collidePlatBottom(obj, y + 60);
        }
      },
      7: (obj, x, y, colVal) => {
        ///thorn bottom
        this.collidePlatBottom(obj, y + 10);
        if (obj instanceof Player) {
          obj.setHit(5);
        }
      },
      8: (obj, x, y, colVal) => {
        ///top / right
        if (this.collidePlatTop(obj, y)) {
          return;
        } else {
          this.collidePlatRight(obj, x + 60);
        }
      },
      9: (obj, x, y, colVal) => {
        ///left
        this.collidePlatLeft(obj, x);
      },
      10: (obj, x, y, colVal) => {
        ///right
        this.collidePlatRight(obj, x + 60);
      },
      11: (obj, x, y, colVal) => {
        ///right / left / bottom thorn
        if (this.collidePlatLeft(obj, x)) {
          if (obj instanceof Player) {
            obj.setHit(5);
          }
          return;
        } else if (this.collidePlatBottom(obj, y + 10)) {
          if (obj instanceof Player) {
            obj.setHit(5);
          }
          return;
        } else {
          this.collidePlatRight(obj, x + 60);
          if (obj instanceof Player) {
            obj.setHit(5);
          }
        }
      },
      12: (obj, x, y, colVal) => {
        //top / left half in
        if (this.collidePlatLeft(obj, x + 30)) {
          return;
        } else if (obj.x + obj.width > x + 30) {
          this.collidePlatTop(obj, y);
        }
      },
      13: (obj, x, y, colVal) => {
        //top / right half in
        if (this.collidePlatRight(obj, x + 30)) {
          return;
        } else if (obj.x < x + 30) {
          this.collidePlatTop(obj, y);
        }
      },
      14: (obj, x, y, colVal) => {
        /// bottom / left
        if (this.collidePlatBottom(obj, y + 60)) {
          return;
        } else {
          this.collidePlatLeft(obj, x);
        }
      },
      15: (obj, x, y, colVal) => {
        /// bottom / right
        if (this.collidePlatBottom(obj, y + 60)) {
          return;
        } else {
          this.collidePlatRight(obj, x);
        }
      },
      16: (obj, x, y, colVal) => {
        /// bottom
        this.collidePlatBottom(obj, y + 60);
      },
      17: (obj, x, y, colVal) => {
        ///left
        this.collidePlatLeft(obj, x);
      },

      18: (obj, x, y, colVal) => {
        //45 deg right
        this.collideSlopeFortyFiveRight(obj, x, y + 60);
      },
      19: (obj, x, y, colVal) => {
        //45 deg left
        this.collideSlopeFortyFiveLeft(obj, x + 60, y + 60);
      },
      20: (obj, x, y, colVal) => {
        //22 deg right bottom half
        this.collideSlopeTwentyRight(obj, x, y + 60);
      },
      21: (obj, x, y, colVal) => {
        //22 deg left bootom half
        this.collideSlopeTwentyLeft(obj, x + 60, y + 60);
      },
      22: (obj, x, y, colVal) => {
        //22 deg right top half
        this.collideSlopeTwentyRight(obj, x, y + 60, 30);
      },
      23: (obj, x, y, colVal) => {
        //22 deg left top half
        this.collideSlopeTwentyLeft(obj, x, y + 60, 30);
      },
      24: (obj, x, y, colVal) => {
        //22 deg left top half & left
        ///refactor////
        if (this.collideSlopeTwentyLeft(obj, x, y + 60, 30)) {
        return;
        } else {
          this.collidePlatLeft(obj, x)
          ;
        }
      },
      25: (obj, x, y, colVal) => {
        //right half in
        this.collidePlatRight(obj, x + 30)
      },
      26: (obj, x, y, colVal) => {
        //left half in
        this.collidePlatLeft(obj, x + 30);
      },
      27: (obj, x, y, colVal) => {
        //top  half in/ right half in
        if (this.collidePlatRight(obj, x + 30)) {
          return;
        } else if (obj.x < x + 30) {
          this.collidePlatTop(obj, y + 30);
        }
      },
      28: (obj, x, y, colVal) => {
        //top  half in/ right half in / bottom
        if (obj.x < x + 30) {
          if (this.collidePlatTop(obj, y + 30)) {
            return;
          } else if (this.collidePlatBottom(obj, y + 60)){
            return;
          } else {
            this.collidePlatRight(obj, x + 30)
          }
        };  
      },
      29: (obj, x, y, colVal) => {
        //top half in
        this.collidePlatTop(obj, y + 30);
      },
      30: (obj, x, y, colVal) => {
        //top  half in/ left half in / bottom
        if (obj.x + obj.width > x + 30) {
          if (this.collidePlatTop(obj, y + 30)) {
            return;
          } else if (this.collidePlatBottom(obj, y + 60)) {
            return;
          } else {
            this.collidePlatLeft(obj, x + 30)
          }
        };
      },
      31: (obj, x, y, colVal) => {
        //top  half in/ right
        if (this.collidePlatTop(obj, y + 30)) {
          return;
        } else {
          this.collidePlatRight(obj, x + 60)
        }
      },
      32: (obj, x, y, colVal) => {
        //top  half in/ left
        if (this.collidePlatTop(obj, y + 30)) {
          return;
        } else {
          this.collidePlatLeft(obj, x)
        }
      },
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
        obj1.setHit(this.damage);
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

    // if (gameObj.x + gameObj.width > tileLeft && (gameObj.getDirY() + 60) > tileY) {
    //   gameObj.y = (tileY - 60) - 0.05;
    //   gameObj.onGround = true;
    // }
    // console.log(gameObj.bottomSide());
    // console.log(gameObj.rightSide());
    // let midX = gameObj.leftSide() + (gameObj.width / 2);
    // let slopeY = ((Math.tan(45 * Math.PI / 180) / gameObj.rightSide()));
    // let oldSlopeY = ((Math.tan(45 * Math.PI / 180) / gameObj.oldX + gameObj.width))
    // console.log(slopeY);
    // if (gameObj.oldY >= tileBottom - oldSlopeY &&
    //   gameObj.getDirY() + gameObj.height >= tileBottom - slopeY
    //   // gameObj.oldY + gameObj.height < tileBottom - slopeY
    // ) {
    //   // debugger
    //   gameObj.onGround = true;
    //   gameObj.y = tileBottom - gameObj.height -
    //     ((Math.tan(45 * Math.PI / 180) / gameObj.rightSide())) - 0.01;
    //   // gameObj.y--;
    //   console.log(gameObj.y);
    // }
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

  collideSlopeTwentyLeft(gameObj, tileRight, tileBottom, half = 30) {
    let tileY = tileBottom - (half + tileRight - gameObj.leftSide()) / 2;
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

  collidePlatform(gameObject, x, y, colVal) {
    if (!colVal || !this.collisionPlatformKeys[colVal]) return;
    this.collisionPlatformKeys[colVal](gameObject, x, y);
    // switch (colVal) {
    //   case 1:
    //     this.collidePlatTop(gameObject, y);
    //     break;
    //   case 2:
    //     if (gameObject.velY > 0) {
    //       this.collidePlatTop(gameObject, y);
    //     }
    //     break;
    //   case 3:
    //     if (this.collidePlatTop(gameObject, y)) {
    //       return;
    //     } else if (this.collidePlatLeft(gameObject, x)) {
    //       return;
    //     } else {
    //       this.collidePlatRight(gameObject, x + 60);
    //     }
    //     break;
    //   case 4:
    //     if (this.collidePlatTop(gameObject, y)) {
    //       return;
    //     } else if (this.collidePlatRight(gameObject, x + 60)) {
    //       return;
    //     } else {
    //       this.collidePlatLeft(gameObject, x);
    //       break;
    //     };
    //   case 5:
    //     if (this.collidePlatTop(gameObject, y)) {
    //       return;
    //     } else if (this.collidePlatBottom(gameObject, y + 60)) {
    //       return;
    //     } else {
    //       this.collidePlatRight(gameObject, x + 60);
    //     }
    //     break;
    //   case 6:
    //     if (this.collidePlatTop(gameObject, y)) {
    //       return;
    //     } else {
    //       this.collidePlatBottom(gameObject, y + 60);
    //     }
    //     break;
    //   case 7:
    //     //thorn
    //     this.collidePlatBottom(gameObject, y + 10);
    //     if (gameObject instanceof Player) {
    //       gameObject.setHit(5);
    //     }

    //     break;
    //   case 8:
    //     if (this.collidePlatTop(gameObject, y)) {
    //       return;
    //     } else {
    //       this.collidePlatRight(gameObject, x + 60);
    //     }
    //     break;
    //   case 9:
    //     this.collidePlatLeft(gameObject, x);
    //     break;
    //   case 10:
    //     this.collidePlatRight(gameObject, x + 60);
    //     break;
    //   case 11:
    //     //thorn
    //     if (this.collidePlatLeft(gameObject, x)) {
    //       if (gameObject instanceof Player) {
    //         gameObject.setHit(5);
    //       }
    //       return;
    //     } else if (this.collidePlatBottom(gameObject, y + 10)) {
    //       if (gameObject instanceof Player) {
    //         gameObject.setHit(5);
    //       }
    //       return;
    //     } else {
    //       this.collidePlatRight(gameObject, x + 60);
    //       if (gameObject instanceof Player) {
    //         gameObject.setHit(5);
    //       }
    //     }
    //     break;
    // }
  }
}



export default Collision;
